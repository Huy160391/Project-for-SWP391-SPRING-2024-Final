import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewBookingOfCustomer = () => {
    // State hooks
    const [bookings, setBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5);
    const [buildings, setBuildings] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [sortedBookings, setSortedBookings] = useState([]);
    const [originalBookings, setOriginalBookings] = useState([]);

    // Fetch booking data
    const fetchBookings = async () => {
        // Check if customerId is available
        if (!customerId) {
            setError('Customer ID is undefined or not provided.');
            return;
        }
        
        try {
            // Fetch bookings data
            const bookingRes = await axios.get(`https://localhost:7137/api/Bookings/GetAllBookingsByCustomerId/${customerId}`);
            const fetchedBookings = await Promise.all(bookingRes.data.map(async (booking) => {
                // Fetch building details
                const buildingRes = await axios.get(`https://localhost:7137/api/Apartments/GetListBuildingIdByApartmentId/${booking.apartmentId}`);
                const buildingId = buildingRes.data[0];
                const buildingDetails = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);

                // Fetch agency details
                const agencyRes = await axios.get(`https://localhost:7137/api/Agencies/${booking.agencyId}`);
                const agency = agencyRes.data;

                // Fetch apartment details
                const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/${booking.apartmentId}`);
                const apartment = apartmentResponse.data;

                return {
                    ...booking,
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
                };
            }));

            // Sort fetched bookings by date
            const sortedBookings = fetchedBookings.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Set state variables
            setSortedBookings(sortedBookings);
            setAllBookings(sortedBookings);
            setBookings(sortedBookings.slice(0, bookingsPerPage));

            // Extract building and agency names
            const buildingNames = [...new Set(sortedBookings.map(booking => booking.buildingName))];
            setBuildings(buildingNames);
            const agencyNames = [...new Set(sortedBookings.map(booking => booking.agencyName))];
            setAgencies(agencyNames);

            // Store original bookings for filtering
            setOriginalBookings(sortedBookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            setError('Failed to fetch bookings. Please check the console for more details.');
        }
    };

    // Effect hook to fetch bookings when component mounts or dependencies change
    useEffect(() => {
        fetchBookings();
    }, [customerId, bookingsPerPage]);

    // Function to handle search filtering
    const handleSearch = () => {
        let filtered = [...originalBookings];

        if (selectedBuilding) {
            filtered = filtered.filter(booking => booking.buildingName.toLowerCase() === selectedBuilding.toLowerCase());
        }
        if (selectedAgency) {
            filtered = filtered.filter(booking => booking.agencyName.toLowerCase() === selectedAgency.toLowerCase());
        }

        // Update state variables with filtered bookings
        setAllBookings(filtered);

        if (!selectedBuilding && !selectedAgency) {
            setAllBookings(originalBookings);
            setBookings(originalBookings.slice(0, bookingsPerPage));
        } else {
            setBookings(filtered.slice(0, bookingsPerPage));
        }

        setCurrentPage(1);
    };

    // Function to handle building selection change
    const handleBuildingChange = (event) => {
        setSelectedBuilding(event.target.value);
    };

    // Function to handle agency selection change
    const handleAgencyChange = (event) => {
        setSelectedAgency(event.target.value);
    };

    // Pagination calculation
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = allBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    // Pagination function to switch to next page
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(allBookings.length / bookingsPerPage)));

    // Pagination function to switch to previous page
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // Render error message if error state is set
    if (allBookings.length === 0) {
        return <div className="text-center font-bold">Bạn không có booking nào.</div>;
    }
    return (
        <div className="flex flex-col w-full">
            <div className="mt-5 ml-5 flex justify-start items-center space-x-10">
                <h1 className="text-4xl font-bold text-indigo-600 px-4 py-2 bg-white rounded-lg">
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
                        {agencies.map((agency, index) => (
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
            {currentBookings.map((booking, index) => (
                <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
                    <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg">
                        <div className="lg:col-span-3 mb-4">
                            <h3 className="text-lg leading-6 font-medium text-indigo-600">Booking #{index + 1} </h3>
                        </div>

                        <div className="lg:col-span-1">
                            <img src={`https://localhost:7137/api/Apartments/GetApartmentImage/${booking.apartmentId}`} alt="Apartment" className="h-96 w-full object-cover rounded-lg shadow-lg" />
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 gap-4 text-xl">
                            <div className="border-b border-gray-300 pb-4">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    <strong>Building Information</strong>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Building Name:</strong> <span className="text-gray-600">{booking.buildingName}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Date:</strong> <span className="text-gray-600">{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Address:</strong> <span className="text-gray-600">{booking.buildingAddress}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Status:</strong> <span className="text-gray-600">{booking.status}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 pb-4">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    <strong>Apartment Information</strong>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>ID:</strong> <span className="text-gray-600">{booking.apartmentId}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Number Of Bedrooms:</strong> <span className="text-gray-600">{booking.apartmentNumberOfBedrooms}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Number Of Bathrooms:</strong> <span className="text-gray-600">{booking.apartmentNumberOfBathrooms}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Area:</strong> <span className="text-gray-600">{booking.apartmentArea}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Floor Number:</strong> <span className="text-gray-600">{booking.apartmentFloorNumber}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Price:</strong> <span className="text-green-600 text-xl">${booking.apartmentPrice}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 pb-4">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    <strong>Agency Information</strong>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Name:</strong> <span className="text-gray-600">{booking.agencyName}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                    <strong>Phone:</strong> <span className="text-gray-600">{booking.agencyPhone}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700 lg:col-span-2">
                                    <strong>Address:</strong> <span className="text-gray-600">{booking.agencyAddress}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Improved button styling for "View Bill" */}
                    <div className="px-4 py-4 sm:px-6 text-right">
                        <button
                            onClick={() => console.log('View bill clicked for booking', booking.bookingId)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            View Information
                        </button>
                    </div>
                </div>

            ))}
            <div className="border-8">

                <div className="pagination flex justify-between items-center mt-4 mb-10 border-2 rounded-lg bg-white mx-5 px-4 py-2">
                    <button onClick={prevPage} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {Math.ceil(allBookings.length / bookingsPerPage)}
                    </span>
                    <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewBookingOfCustomer;

