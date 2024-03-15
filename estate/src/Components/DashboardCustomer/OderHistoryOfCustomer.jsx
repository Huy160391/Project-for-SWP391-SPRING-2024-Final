import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link, useParams } from 'react-router-dom';

const OderHistoryOfCustomer = () => {
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [buildings, setBuildings] = useState([]);
    const [agencys, setAgencys] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { customerId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customerId) {
                setError('Agency ID is undefined or not provided.');
                return;
            }
            try {
                const orderRes = await axios.get(`https://localhost:7137/api/Orders/GetAllOderByCustomerId/${customerId}`);
                const fetchedOrders = await Promise.all(orderRes.data.map(async (order) => {
                    const buildingRes = await axios.get(`https://localhost:7137/api/Apartments/GetListBuildingIdByApartmentId/${order.apartmentId}`);
                    const buildingId = buildingRes.data[0];
                    const buildingDetails = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);

                    const agencyRes = await axios.get(`https://localhost:7137/api/Agencies/${order.agencyId}`);
                    const agencyName = `${agencyRes.data.firstName} ${agencyRes.data.lastName}`;

                    return {
                        ...order,
                        buildingName: buildingDetails.data.name,
                        buildingAddress: buildingDetails.data.address,
                        agencyName,
                    };
                }));
                setAllOrders(fetchedOrders);
                setOrders(fetchedOrders.slice(0, ordersPerPage));

                const buildingNames = [...new Set(fetchedOrders.map(order => order.buildingName))];
                setBuildings(buildingNames);

                const agencyNames = [...new Set(fetchedOrders.map(order => order.agencyName))];
                setAgencys(agencyNames);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                setError('Failed to fetch orders. Please check the console for more details.');
            }
        };

        fetchOrders();
    }, [customerId, ordersPerPage]);

    const handleBuildingChange = (event) => {
        setSelectedBuilding(event.target.value);
    };

    const handleAgencyChange = (event) => {
        setSelectedAgency(event.target.value);
    };

    const handleSearch = () => {
        let filtered = allOrders;
        if (selectedBuilding) {
            filtered = filtered.filter(order => order.buildingName === selectedBuilding);
        }
        if (selectedAgency) {
            filtered = filtered.filter(order => order.agencyName === selectedAgency);
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

    if (error) {
        return <div className="text-red-500 text-center font-bold">{error}</div>;
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
                    View Your Oder History
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
                        {agencys.map((agency, index) => (
                            <option key={index} value={agency}>{agency}</option>
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
            {orders.map((order, index) => (
                <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
                    <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white  rounded-lg">
                        <div className="md:col-span-2 lg:col-span-3">
                            <div className="text-lg font-semibold text-indigo-600">Order #{index + 1} Details</div>
                        </div> {/* Enhanced header styling */}
                        <div className="text-sm font-medium text-gray-700">
                            <strong>Building Name:</strong> <span className="text-gray-600">{order.buildingName}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            <strong>Date:</strong> <span className="text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            <strong>Apartment ID:</strong> <span className="text-gray-600">{order.apartmentId}</span>
                        </div>

                        <div className="text-sm font-medium text-gray-700">
                            <strong>Building Address:</strong> <span className="text-gray-600">{order.buildingAddress}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            <strong>Status:</strong> <span className="text-gray-600">{order.status}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            <strong>Total Amount:</strong> <span className="text-gray-600">{order.totalAmount ?? 'N/A'}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700 lg:col-span-3">
                            <strong>Agency Name:</strong> <span className="text-gray-600">{order.agencyName}</span>
                        </div>
                    </div>

                    <div className="px-4 py-4 sm:px-6">
                        <Link to={`/view-order-bill-of-customer/${order.orderId}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                            View Bill Information</Link>
                    </div>
                </div>
            ))}
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

export default OderHistoryOfCustomer;


