import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ConfimOderManager = () => {
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    const [ordersPerPage] = useState(5);
    const [buildings, setBuildings] = useState([]);
    const [agencies, setAgencys] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [sortedOrders, setSortedOrders] = useState([]);
    const [originalOrders, setOriginalOrders] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage here

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setShowModal(true);
    };

    // Pagination change page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const [postsPerPage] = useState(5);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(allOrders.length / ordersPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));


    const fetchOrders = async () => {
        try {
            const orderRes = await axios.get(`https://localhost:7137/api/Orders`);
            const filteredOrders = orderRes.data.filter(order => order.status === "Unpaid" || order.status === "Waiting");
            const fetchedOrders = await Promise.all(filteredOrders.map(async (order) => {
                const buildingRes = await axios.get(`https://localhost:7137/api/Apartments/GetListBuildingIdByApartmentId/${order.apartmentId}`);
                const buildingId = buildingRes.data[0];
                const buildingDetails = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);
                const agencyRes = await axios.get(`https://localhost:7137/api/Agencies/${order.agencyId}`);
                const agency = agencyRes.data;
                const RemainingAmountRes = await axios.get(`https://localhost:7137/api/Orders/GetRemainingAmount/${order.orderId}`);
                const RemainingAmount = RemainingAmountRes.data;
                const customerResponse = await axios.get(`https://localhost:7137/api/Customers/${order.customerId}`);
                const customer = customerResponse.data;
                const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/${order.apartmentId}`);
                const apartment = apartmentResponse.data;

                return {
                    ...order,
                    buildingName: buildingDetails.data.name,
                    buildingAddress: buildingDetails.data.address,
                    apartmentNumberOfBedrooms: apartment.numberOfBedrooms,
                    apartmentNumberOfBathrooms: apartment.numberOfBathrooms,
                    apartmentArea: apartment.area,
                    apartmentFloorNumber: apartment.floorNumber,
                    apartmentPrice: apartment.price,
                    agencyName: `${agency.firstName} ${agency.lastName}`,
                    agencyAddress: agency.address,
                    agencyPhone: agency.phone,
                    customerName: `${customer.firstName} ${customer.lastName}`,
                    customerAddress: customer.address,
                    customerPhone: customer.phone,
                    RemainingAmount,
                };
            }));
            const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            setSortedOrders(sortedOrders);
            setAllOrders(sortedOrders);
            setOrders(sortedOrders.slice(0, ordersPerPage));
            const buildingNames = [...new Set(sortedOrders.map(order => order.buildingName))];
            setBuildings(buildingNames);
            const agencyNames = [...new Set(sortedOrders.map(order => order.agencyName))];
            setAgencys(agencyNames);
            const customerNames = [...new Set(sortedOrders.map(order => order.customerName))];
            setCustomers(customerNames);
            setOriginalOrders(sortedOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            setError('Failed to fetch orders. Please check the console for more details.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [ordersPerPage]);

    const handleBuildingChange = (event) => {
        setSelectedBuilding(event.target.value);
    };

    const handleAgencyChange = (event) => {
        setSelectedAgency(event.target.value);
    };
    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const handleSearch = () => {
        
        const originalOrdersCopy = [...originalOrders];
        
        let filtered = originalOrdersCopy.slice(); 
    
        if (selectedBuilding) {
            filtered = filtered.filter(order => order.buildingName.toLowerCase() === selectedBuilding.toLowerCase());
        }
        if (selectedAgency) {
            filtered = filtered.filter(order => order.agencyName.toLowerCase() === selectedAgency.toLowerCase());
        }
        if (selectedCustomer) {
            filtered = filtered.filter(order => order.customerName.toLowerCase() === selectedCustomer.toLowerCase());
        }
    
        setAllOrders(filtered);
    
        if (!selectedBuilding && !selectedAgency && !selectedCustomer) {
            setOrders(originalOrdersCopy.slice(0, ordersPerPage));
        } else {
            setOrders(filtered.slice(0, ordersPerPage));
        }
    
        setCurrentPage(1);
    };
    



    if (error) {
        return <div className="text-red-500 text-center font-bold">{error}</div>;
    }


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allOrders.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }
    const approveOrder = async (orderId) => {
        try {
            if (window.confirm(`Do you want to Approve Order?`)) {
                await axios.put(`https://localhost:7137/api/Orders/ChangeOrderStatus/${orderId}/Complete`);
                alert("Approve Order Success")

                fetchOrders();
            }

        } catch (error) {
            console.error('Failed to approve order:', error);

            setError('Failed to approve order. Please check the console for more details.');
        }
    };
    const requesttotransferAmountagain = async (orderId) => {
        try {
            if (window.confirm(`Would you like to request a transfer of the amount again?`)) {
                await axios.put(`https://localhost:7137/api/Orders/ChangeOrderStatus/${orderId}/Unpaid`);
                alert("Request sent successfully")

                fetchOrders();
            }

        } catch (error) {
            console.error('Failed to request a transfer of the amount again:', error);

            setError('Failed to request a transfer of the amount again. Please check the console for more details.');
        }
    };
    const cancelOrder = async (orderId) => {
        try {
            if (window.confirm(`Do you want to Cancel Order?
    
    This order will be deleted`)) {

                await axios.delete(`https://localhost:7137/api/Orders/DeleteOrderAndHealingBooking/${orderId}`);
                alert("Cancel Order Success")
                fetchOrders();
            }
        } catch (error) {
            console.error('Failed to cancel order:', error);
            setError('Failed to cancel order. Please check the console for more details.');
        }
    };

    return (
        <div className="flex flex-col w-full border-8 rounded-lg border-gray-200  ">
            <div className="border-8">
                <div className="mt-5 ml-3 mr-10 flex justify-start items-center space-x-10">
                    <h1 className="text-4xl font-bold text-indigo-600 px-4 py-2 bg-white rounded-lg">
                        Confirm Order Manager
                    </h1>
                </div>


                <div className="mt-5 ml-5 mb-6 flex justify-start items-center space-x-10">
                    <div>
                        <label htmlFor="building-select" className="block text-sm font-medium text-gray-700">Building Name:</label>
                        <select id="building-select" value={selectedBuilding} onChange={handleBuildingChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow">
                            <option value="">All</option>
                            {buildings.map((building, index) => (
                                <option key={index} value={building}>{building}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="agency-select" className="block text-sm font-medium text-gray-700">Agency Name:</label>
                        <select id="agency-select" value={selectedAgency} onChange={handleAgencyChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow">
                            <option value="">All</option>
                            {agencies.map((agency, index) => (
                                <option key={index} value={agency}>{agency}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="customer-select" className="block text-sm font-medium text-gray-700">Customer Name:</label>
                        <select id="customer-select" value={selectedCustomer} onChange={handleCustomerChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow">
                            <option value="">All</option>
                            {customers.map((customer, index) => (
                                <option key={index} value={customer}>{customer}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleSearch} className="mt-4 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow">
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mt-4 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow">
                        Back
                    </button>
                </div>
            </div>


            {currentOrders.map((order, index) => (
                <div key={index} className=" bg-white    border-8">
                    <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg">
                        <div className="lg:col-span-1 flex items-center">
                            <img
                                src={`https://localhost:7137/api/Apartments/GetApartmentImage/${order.apartmentId}`}
                                alt="Apartment"
                                className="w-full h-auto object-cover rounded-lg shadow-lg inline-block cursor-pointer"
                                onClick={() => handleImageClick(`https://localhost:7137/api/Apartments/GetApartmentImage/${order.apartmentId}`)}
                            />
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 gap-4 text-xl">
                            <div className="border-b border-gray-300 pb-4">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    <strong>Building Information</strong>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Building Name:</strong> <span className="text-gray-600">{order.buildingName}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Date:</strong> <span className="text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Address:</strong> <span className="text-gray-600">{order.buildingAddress}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Status:</strong> <span className="text-gray-600">{order.status}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 pb-4">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    <strong>Apartment Information</strong>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>ID:</strong> <span className="text-gray-600">{order.apartmentId}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Number Of Bedrooms:</strong> <span className="text-gray-600">{order.apartmentNumberOfBedrooms}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Number Of Bathrooms:</strong> <span className="text-gray-600">{order.apartmentNumberOfBathrooms}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Area:</strong> <span className="text-gray-600">{order.apartmentArea}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Floor Number:</strong> <span className="text-gray-600">{order.apartmentFloorNumber}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Price:</strong> <span className="text-green-600 text-xl">${order.apartmentPrice}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 pb-4">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    <strong>Agency Information</strong>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Name:</strong> <span className="text-gray-600">{order.agencyName}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Phone:</strong> <span className="text-gray-600">{order.agencyPhone}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700 lg:col-span-2">
                                    <strong>Address:</strong> <span className="text-gray-600">{order.agencyAddress}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 pb-4">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    <strong>Customer Information</strong>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Name:</strong> <span className="text-gray-600">{order.customerName}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700 ">
                                    <strong>Phone:</strong> <span className="text-gray-600">{order.customerPhone}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700 lg:col-span-2">
                                    <strong>Address:</strong> <span className="text-gray-600">{order.customerAddress}</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className=''>
                        <div className="px-4 py-4 sm:px-6">
                            <div className=" text-2xl font-medium text-gray-700 text-right mb-3 ">
                                <strong>Remaining Amount:</strong> <span className="text-green-600 text-4xl">${order.RemainingAmount}</span>
                            </div>
                            {order.status === "Unpaid" && (
                                <h1 className="text-4xl font-bold text-gray-600 px-4 py-2 w-44  bg-gray-400 rounded-lg ml-20">
                                    Unpaid
                                </h1>
                            )}
                            {order.status === "Waiting" && (
                                <h1 className="text-4xl font-bold text-green-200 px-4 py-2 w-44 bg-green-500 rounded-lg ml-20">
                                    Waiting
                                </h1>
                            )}

                            <div className="lg:col-span-3 lg:text-right">
                                <img
                                    src={`https://localhost:7137/api/Orders/GetImage/${order.orderId}`}
                                    alt="Apartment"
                                    className="h-40 w-52 object-cover rounded-lg shadow-lg inline-block cursor-pointer"
                                    onClick={() => handleImageClick(`https://localhost:7137/api/Orders/GetImage/${order.orderId}`)}
                                />
                                <p className="text-gray-500">Click photo to view full</p>
                            </div>


                        </div>
                        <div className="px-4 py-4 sm:px-6 text-right">
                            <button
                                onClick={() => approveOrder(order.orderId)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Approve Order
                            </button>
                            <button
                                onClick={() => requesttotransferAmountagain(order.orderId)}
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Request To Transfer Amount Again
                            </button>
                            <button
                                onClick={() => cancelOrder(order.orderId)}
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Cancel Order
                            </button>
                        </div>


                    </div>
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-20">
                            <div className="relative max-w-4xl w-full bg-white rounded-lg shadow flex justify-center items-center">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-0 right-0 m-4 text-red-400 hover:gray-300 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <img src={selectedImage} alt="Selected" className="max-h-screen max-w-full" />
                            </div>
                        </div>


                    )}


                </div>
            ))}
            <div className="border-8">

                <div className="pagination flex justify-between items-center mt-4 mb-10 border-2 rounded-lg bg-white mx-5 px-4 py-2">
                    <button onClick={prevPage} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {Math.ceil(allOrders.length / ordersPerPage)}
                    </span>
                    <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Next
                    </button>
                </div>
            </div>






        </div>
    );
};

export default ConfimOderManager;


