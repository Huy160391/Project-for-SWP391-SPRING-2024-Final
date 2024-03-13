import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewListBooking = () => {
    const { apartmentId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://localhost:7137/api/Bookings/GetAllBookingByApartmentID/${apartmentId}`);
                const bookingsWithDetails = await Promise.all(response.data.map(async (booking) => {
                    try {
                        const customerResponse = await axios.get(`https://localhost:7137/api/Customers/${booking.customerId}`);
                        return {
                            ...booking,
                            customerName: `${customerResponse.data.firstName} ${customerResponse.data.lastName}`,
                        };
                    } catch (error) {
                        console.error('Error fetching customer data:', error);
                        return {
                            ...booking,
                            customerName: 'Name not available'
                        };
                    }
                }));
                setBookings(bookingsWithDetails);
            } catch (error) {
                setError('Failed to fetch bookings');
            } finally {
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, [apartmentId]);

    const handleCompleteBooking = async (bookingId) => {
        if (window.confirm("You really want to complete this booking?")) {
            try {
                await axios.post(`https://localhost:7137/api/Orders/CreateOrderFromBooking/${bookingId}`);
                window.location.reload();
            } catch (error) {
                console.error('Error completing booking:', error);
                alert('Failed to complete booking');
            }
        }
    };

    const handleDeleteCompleteBooking = async (bookingId) => {
        if (window.confirm("You really want to delete this completed booking?")) {
            try {
                await axios.delete(`https://localhost:7137/api/Orders/DeleteOrderAndHealingBooking/${bookingId}`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting completed booking:', error);
                alert('Failed to delete completed booking');
            }
        }
    };

    const handleRandomCompleteBooking = () => {
        const activeBookings = bookings.filter(booking => booking.status === 'Active');
        if (activeBookings.length === 0) {
            alert("No active bookings available to complete.");
            return;
        }
        const randomBooking = activeBookings[Math.floor(Math.random() * activeBookings.length)];
        if (window.confirm(`Do you want to select this customer "${randomBooking.customerName}" to Complete Booking?`)) {
            handleCompleteBooking(randomBooking.bookingId);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 max-w-4xl mx-auto p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">View List Booking for Apartment {apartmentId}</h1>
                <div className="mb-3">
                    <button onClick={() => navigate(-1)} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300">
                    Back
                </button>
                <button onClick={handleRandomCompleteBooking} className="mt-3 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300">
                    Random Complete Booking
                </button>
                </div>
                
                <div className="space-y-4">
                    {bookings.map((booking, index) => (
                        <div key={index} className="bg-white shadow overflow-hidden rounded-lg p-4">
                            <div className="mb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Booking ID: {booking.bookingId}</h3>
                                <p className="mt-1 text-sm text-gray-600">Customer Name: {booking.customerName || 'Name not available'}</p>
                                <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">Status: {booking.status}</p>
                                <div className="flex justify-end">
                                    {booking.status === 'Active' ? (
                                        <button onClick={() => handleCompleteBooking(booking.bookingId)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Complete Booking
                                        </button>
                                    ) : (
                                        <button onClick={() => handleDeleteCompleteBooking(booking.bookingId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete Complete Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewListBooking;
