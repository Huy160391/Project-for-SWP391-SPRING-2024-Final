import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewBookingOfCustomer = () => {
    const [bookings, setBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5);
    const [buildings, setBuildings] = useState([]);
    const [agencys, setAgencys] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { customerId } = useParams();

    useEffect(() => {
        const fetchBookings = async () => {
            if (!customerId) {
                setError('Customer ID is undefined or not provided.');
                return;
            }
            try {
                const bookingRes = await axios.get(`https://localhost:7137/api/Bookings/GetAllBookingsByCustomerId/${customerId}`);
                const fetchedBookings = await Promise.all(bookingRes.data.map(async (booking) => {
                    const buildingRes = await axios.get(`https://localhost:7137/api/Apartments/GetListBuildingIdByApartmentId/${booking.apartmentId}`);
                    const buildingId = buildingRes.data[0];
                    const buildingDetails = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);
                    const agencyRes = await axios.get(`https://localhost:7137/api/Agencies/${booking.agencyId}`);
                    const agencyName = `${agencyRes.data.firstName} ${agencyRes.data.lastName}`;



                    return {
                        ...booking,
                        buildingName: buildingDetails.data.name,
                        buildingAddress: buildingDetails.data.address,
                        agencyName,

                    };
                }));
                setAllBookings(fetchedBookings);
                setBookings(fetchedBookings.slice(0, bookingsPerPage));
                const buildingNames = [...new Set(fetchedBookings.map(booking => booking.buildingName))];
                setBuildings(buildingNames);
                const agencyNames = [...new Set(fetchedBookings.map(booking => booking.agencyName))];
                setAgencys(agencyNames);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                setError('Failed to fetch bookings. Please check the console for more details.');
            }
        };

        fetchBookings();
    }, [customerId, bookingsPerPage]);

    const handleBuildingChange = (event) => {
        setSelectedBuilding(event.target.value);
    };

    const handleAgencyChange = (event) => {
        setSelectedAgency(event.target.value);
    };

    const handleSearch = () => {
        let filtered = allBookings;
        if (selectedBuilding) {
            filtered = filtered.filter(booking => booking.buildingName === selectedBuilding);
        }
        if (selectedAgency) {
            filtered = filtered.filter(booking => booking.agencyName === selectedAgency);
        }
        setBookings(filtered.slice(0, bookingsPerPage));
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Pagination change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const indexOfLastBooking = pageNumber * bookingsPerPage;
        const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
        setBookings(allBookings.slice(indexOfFirstBooking, indexOfLastBooking));
    };

    if (error) {
        return <div className="text-red-500 text-center font-bold">{error}</div>;
    }

    // Calculate page count
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allBookings.length / bookingsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="mt-5 ml-5 flex justify-start items-center space-x-10">
                <h1 className="text-4xl font-bold text-indigo-600  px-4 py-2 bg-white rounded-lg">
                    View Your Booking
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
            {bookings.map((booking, index) => (
                <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
                    <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg">
                        {/* Header styling with larger text and more emphasis */}
                        <div className="lg:col-span-3 mb-4">
                            <h3 className="text-lg leading-6 font-medium text-indigo-600">Booking #{index + 1} </h3>
                        </div>

                        {/* Display apartment image with better styling */}
                        <div className="lg:col-span-3">
                            <img src={`https://localhost:7137/api/Apartments/GetApartmentImage/${booking.apartmentId}`} alt="Apartment" className="h-40 w-52 object-cover rounded-lg shadow-lg" />
                        </div>

                        {/* Detail rows with clearer font and spacing */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-4">
                            <div className="text-sm font-medium text-gray-700">
                                <strong>Building Name:</strong> <span className="text-gray-600">{booking.buildingName}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                                <strong>Date:</strong> <span className="text-gray-600">{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                                <strong>Building Address:</strong> <span className="text-gray-600">{booking.buildingAddress}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                                <strong>Apartment ID:</strong> <span className="text-gray-600">{booking.apartmentId}</span>
                            </div>

                            <div className="text-sm font-medium text-gray-700">
                                <strong>Status:</strong> <span className="text-gray-600">{booking.status}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                                <strong>Total Amount:</strong> <span className="text-gray-600">{booking.totalAmount ?? 'N/A'}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-700 lg:col-span-2">
                                <strong>Agency Name:</strong> <span className="text-gray-600">{booking.agencyName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Improved button styling for "View Bill" */}
                    <div className="px-4 py-4 sm:px-6 text-right">
                        <button
                            onClick={() => console.log('View bill clicked for booking', booking.bookingId)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            View Bill
                        </button>
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

export default ViewBookingOfCustomer;


