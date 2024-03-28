import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderHistoryOfAgency = () => {
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [buildings, setBuildings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { agencyId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!agencyId) {
                setError('Agency ID is undefined or not provided.');
                return;
            }
            try {
                const orderRes = await axios.get(`https://localhost:7137/api/Orders/GetAllOderByAgencyId/${agencyId}`);
                const fetchedOrders = await Promise.all(orderRes.data.map(async (order) => {
                    const buildingRes = await axios.get(`https://localhost:7137/api/Apartments/GetListBuildingIdByApartmentId/${order.apartmentId}`);
                    const buildingId = buildingRes.data[0];
                    const buildingDetails = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);

                    const customerRes = await axios.get(`https://localhost:7137/api/Customers/${order.customerId}`);
                    const customerName = `${customerRes.data.firstName} ${customerRes.data.lastName}`;
                    const apartmentNameRes = await axios.get(
                        `https://localhost:7137/api/Apartments/GetRoomNumberByApartmentId/${order.apartmentId}`
                      );
                      const apartmentName = apartmentNameRes.data;
                    return {
                        ...order,
                        buildingName: buildingDetails.data.name,
                        buildingAddress: buildingDetails.data.address,
                        customerName,
                        apartmentName,
                    };
                }));
                setAllOrders(fetchedOrders);
                setOrders(fetchedOrders.slice(0, ordersPerPage));

                const buildingNames = [...new Set(fetchedOrders.map(order => order.buildingName))];
                setBuildings(buildingNames);

                const customerNames = [...new Set(fetchedOrders.map(order => order.customerName))];
                setCustomers(customerNames);

                const orderstatus = [...new Set(fetchedOrders.map(order => order.status))];
                setStatuses(orderstatus);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                setError('Failed to fetch orders. Please check the console for more details.');
            }
        };

        fetchOrders();
    }, [agencyId, ordersPerPage]);

    const handleBuildingChange = (event) => {
        setSelectedBuilding(event.target.value);
    };

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSearch = () => {
        let filtered = allOrders;
        if (selectedBuilding) {
            filtered = filtered.filter(order => order.buildingName === selectedBuilding);
        }
        if (selectedCustomer) {
            filtered = filtered.filter(order => order.customerName === selectedCustomer);
        }
        if (selectedStatus) {
            filtered = filtered.filter(order => order.status === selectedStatus);
        }
        setOrders(filtered.slice(0, ordersPerPage));
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Pagination change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const indexOfLastOrder = pageNumber * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        setOrders(allOrders.slice(indexOfFirstOrder, indexOfLastOrder));
    };



    if (allOrders.length === 0) {
        return <div className="text-center font-bold">Chưa có order nào</div>;
    }
    // Calculate page count
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allOrders.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="mt-5 ml-5 flex justify-start items-center space-x-10">
                <h1 className="text-4xl font-bold text-indigo-600  px-4 py-2 bg-white rounded-lg">
                    View Order History
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
                    <label htmlFor="customer-select" className="block text-sm font-medium text-gray-700">Customer Name:</label>
                    <select id="customer-select" value={selectedCustomer} onChange={handleCustomerChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow">
                        <option value="">All</option>
                        {customers.map((customer, index) => (
                            <option key={index} value={customer}>{customer}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="status-select" className="block text-sm font-medium text-gray-700">Status:</label>
                    <select id="status-select" value={selectedStatus} onChange={handleStatusChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow">
                        <option value="">All</option>
                        {statuses.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
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

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Building Name</th>
                            <th className="px-4 py-2">Apartment Name</th>
                            <th className="px-4 py-2">Customer Name</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-4 py-2">{order.buildingName}</td>
                                <td className="px-4 py-2">{order.apartmentName}</td>
                                <td className="px-4 py-2">{order.customerName}</td>
                                <td className="px-4 py-2">{order.status}</td>
                                <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-8 mb-8">
                <nav aria-label="Page navigation" className="select-none">
                    <ul className="inline-flex -space-x-px">
                        {pageNumbers.map(number => (
                            <li key={number} className="mx-1">
                                <button
                                    onClick={() => paginate(number)}
                                    className={`px-4 py-2 text-sm font-semibold leading-5 transition-colors duration-150 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue ${currentPage === number ? 'bg-blue-500 text-white border-blue-600' : 'text-blue-700 bg-white hover:bg-blue-100 hover:text-blue-700'}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default OrderHistoryOfAgency;
