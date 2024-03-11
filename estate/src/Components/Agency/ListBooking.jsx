import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ListBooking() {
    const { apartmentId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`https://localhost:7137/api/Bookings/GetAllBookingByApartmentID?apartmentId=${apartmentId}`);

                setBookings(response.data);

            } catch (error) {
                console.error('Error fetching apartment:', error);
                setError('Error fetching apartment:', error.message);
            }
        };

        fetchBooking();
    }, [apartmentId]);

    if (!bookings) {
        return <div>Errrrrrrrrrrrrrrrrrr</div>;
    }
    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Booking List</h2>
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    {Array.isArray(bookings) && bookings.length > 0 ? (
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Mã đặt phòng</th>
                                    <th className="px-4 py-2">Ngày</th>
                                    <th className="px-4 py-2">Mã đại lý</th>
                                    <th className="px-4 py-2">Mã căn hộ</th>
                                    <th className="px-4 py-2">Mã khách hàng</th>
                                    <th className="px-4 py-2">Trạng thái</th>
                                    <th className="px-4 py-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.bookingId}>
                                        <td className="px-4 py-2">{booking.bookingId}</td>
                                        <td className="px-4 py-2">{booking.date}</td>
                                        <td className="px-4 py-2">{booking.agencyId}</td>
                                        <td className="px-4 py-2">{booking.apartmentId}</td>
                                        <td className="px-4 py-2">{booking.customerId}</td>
                                        <td className="px-4 py-2">{booking.status}</td>
                                        <td className="px-4 py-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Chấp nhận
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>Không có lịch đặt phòng nào</div>
                    )}
                </div>
            )}
        </div>
    );
}
export default ListBooking;
