import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewListBooking = () => {
    const { apartmentId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [apartmentName, setApartmentName] = useState('');
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://localhost:7137/api/Bookings/GetAllBookingByApartmentID/${apartmentId}`);
                let fetchedApartmentName = ''; // Temporary variable to hold the apartment name
                const bookingsWithDetails = await Promise.all(response.data.map(async (booking) => {
                    try {
                        const customerResponse = await axios.get(`https://localhost:7137/api/Customers/${booking.customerId}`);
                        const apartmentNameResponse = await axios.get(`https://localhost:7137/api/Apartments/GetRoomNumberByApartmentId/${apartmentId}`);
                        const apartmentName = apartmentNameResponse.data;
                        // Set the fetched apartment name to our temporary variable if not already set
                        if (!fetchedApartmentName) fetchedApartmentName = apartmentName;
    
                        return {
                            ...booking,
                            customerName: `${customerResponse.data.firstName} ${customerResponse.data.lastName}`,
                            apartmentName // include the apartment name in each booking for later use if needed
                        };
                    } catch (error) {
                        console.error('Error fetching booking details:', error);
                        return {
                            ...booking,
                            customerName: 'Name not available',
                            apartmentName: 'Apartment name not available'
                        };
                    }
                }));
                setApartmentName(fetchedApartmentName); // Set the apartment name state
                setBookings(bookingsWithDetails);
            } catch (error) {
                setError('Failed to fetch bookings');
                console.error('Failed to fetch bookings:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, [apartmentId]);

    const handleCompleteBooking = async (bookingId) => {

        try {
            await axios.post(`https://localhost:7137/api/Orders/CreateOrderFromBooking/${bookingId}`);
            window.location.reload();
        } catch (error) {
            console.error('Error completing booking:', error);
            alert('Failed to complete booking');
        }

    };


    const handleRandomCompleteBooking = () => {
        const activeBookings = bookings.filter(booking => booking.status === 'Active');
        if (activeBookings.length === 0) {
            alert("No active bookings available to complete.");
            return;
        }

        const totalMoney = activeBookings.reduce((acc, booking) => acc + booking.money, 0);

        const randomAmount = Math.random() * totalMoney;

        let cumulativeMoney = 0;
        let selectedBooking;
        for (const booking of activeBookings) {
            cumulativeMoney += booking.money;
            if (randomAmount <= cumulativeMoney) {
                selectedBooking = booking;
                break;
            }
        }


        handleCompleteBooking(selectedBooking.bookingId);
        alert(`this customer "${selectedBooking.customerName}" to Complete Booking success`);

    };


    if (loading) return <div>Loading...</div>;
  
    if (bookings.length === 0) {
        return <div className="text-center font-bold">Chưa có khách hàng nào booking căn hộ này</div>;
    }
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 max-w-4xl mx-auto p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">View List Booking for Apartment {apartmentName}</h1>
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
                                <p className="text-sm text-gray-600">Amount Paid In Advance: <span className="text-2xl text-green-600">${booking.money ?? 'N/A'}</span></p>
                                <div className="flex justify-end">
                                    {booking.status === "Complete" && (
                                        <div>
                                            <h1 className="text-4xl font-bold text-green-600 px-2 py-2 w-44  bg-green-400 rounded-lg ml-20">
                                            Complete
                                            </h1>
                                        </div>
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
