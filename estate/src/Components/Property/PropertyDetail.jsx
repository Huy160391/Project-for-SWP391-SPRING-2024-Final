import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetail = () => {
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState({});
  const [customer, setCustomer] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [isBookingDisabled, setIsBookingDisabled] = useState(false);

  useEffect(() => {
    const fetchCustomerAndApartment = async () => {
      try {
        // Lấy thông tin khách hàng từ localStorage
        const userData = JSON.parse(localStorage.getItem("UserData"));
        const username = userData?.data?.username;
        const password = userData?.data?.password;

        if (username && password) {
          const formData = new FormData();
          formData.append('Username', username);
          formData.append('Password', password);

          // Gửi yêu cầu đăng nhập và lấy thông tin khách hàng
          const loginResponse = await axios.post('https://localhost:7137/api/Users/login', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          const userIdFromResponse = loginResponse?.data?.userId;
          setUserId(userIdFromResponse);

          if (userIdFromResponse) {
            const customerResponse = await axios.get(`https://localhost:7137/api/Customers/GetCustomerByUserID/${userIdFromResponse}`);
            setCustomer(customerResponse.data);
          }

        }

        // Lấy thông tin căn hộ dựa trên apartmentId từ đường dẫn
        const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/${apartmentId}`);
        setApartment(apartmentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomerAndApartment();
  }, [apartmentId, userId]);

  const handleBooking = async () => {
    try {
      if (!customer) {
        throw new Error('Customer information is not available.');
      }

      await axios.post(`https://localhost:7137/api/Bookings?customerId=${customer[0].customerId}&apartmentId=${apartmentId}`);

      setBookingStatus('success');
      setBookingMessage('Booking successful!');
      setIsBookingDisabled(true); // Ẩn nút đặt trước khi đã đặt thành công
    } catch (error) {
      console.error('Error booking:', error);

      if (error.response && error.response.status === 409) {
        setBookingStatus('error');
        setBookingMessage('Bạn đã đặt trước rồi');
      } else {
        setBookingStatus('error');
        setBookingMessage('Đặt trước không thành công. Vui lòng thử lại sau.');
      }
    }
  };

  if (!apartment || !customer) {
    return <div className="text-red-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{apartment.apartmentId} - {apartment.buildingId}</h2>
          <p className="text-gray-600 mb-2">{apartment.description}</p>
          <p className="text-gray-600 mb-4">{apartment.status}</p>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">Area: {apartment.area} m2</p>
              <p className="text-sm text-gray-600">{apartment.numberOfBedrooms} phòng ngủ - {apartment.numberOfBathrooms} phòng tắm</p>
              <p className="text-sm text-gray-600">Price: ${apartment.price}</p>
            </div>
            {!isBookingDisabled && (
              <button onClick={handleBooking} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Book Now
              </button>
            )}
            {bookingStatus && <p className={`text-sm ${bookingStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{bookingMessage}</p>}
          </div>
        </div>
        <img src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`} alt="Apartment" className="object-cover w-full h-64" />
      </div>
    </div>
  );
};

export default PropertyDetail;
