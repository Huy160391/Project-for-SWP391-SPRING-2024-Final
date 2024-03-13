// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const PropertyDetail = () => {
//   const { apartmentId } = useParams();
//   const [apartment, setApartment] = useState({});
//   const [customer, setCustomer] = useState(null);
//   const [bookingStatus, setBookingStatus] = useState(null);
//   const [bookingMessage, setBookingMessage] = useState('');
//   const [userId, setUserId] = useState(null);
//   const [isBookingDisabled, setIsBookingDisabled] = useState(false);

//   useEffect(() => {
//     const fetchCustomerAndApartment = async () => {
//       try {
//         // Lấy thông tin khách hàng từ localStorage
//         const userData = JSON.parse(localStorage.getItem("UserData"));
//         const username = userData?.data?.username;
//         const password = userData?.data?.password;

//         if (username && password) {
//           const formData = new FormData();
//           formData.append('Username', username);
//           formData.append('Password', password);

//           // Gửi yêu cầu đăng nhập và lấy thông tin khách hàng
//           const loginResponse = await axios.post('https://localhost:7137/api/Users/login', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           });

//           const userIdFromResponse = loginResponse?.data?.userId;
//           setUserId(userIdFromResponse);

//           if (userIdFromResponse) {
//             const customerResponse = await axios.get(`https://localhost:7137/api/Customers/GetCustomerByUserID/${userIdFromResponse}`);
//             setCustomer(customerResponse.data);
//           }

//         }

//         // Lấy thông tin căn hộ dựa trên apartmentId từ đường dẫn
//         const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/${apartmentId}`);
//         setApartment(apartmentResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchCustomerAndApartment();
//   }, [apartmentId, userId]);

//   const handleBooking = async () => {
//     try {
//       if (!customer) {
//         throw new Error('Customer information is not available.');
//       }

//       await axios.post(`https://localhost:7137/api/Bookings?customerId=${customer[0].customerId}&apartmentId=${apartmentId}`);

//       setBookingStatus('success');
//       setBookingMessage('Booking successful!');
//       setIsBookingDisabled(true); // Ẩn nút đặt trước khi đã đặt thành công
//     } catch (error) {
//       console.error('Error booking:', error);

//       if (error.response && error.response.status === 409) {
//         setBookingStatus('error');
//         setBookingMessage('Bạn đã đặt trước rồi');
//       } else {
//         setBookingStatus('error');
//         setBookingMessage('Đặt trước không thành công. Vui lòng thử lại sau.');
//       }
//     }
//   };

//   if (!apartment || !customer) {
//     return <div className="text-red-500">Loading...</div>;
//   }

//   return (
// <div className="container mx-auto py-8">
//   <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//     <div className="p-6 lg:p-8">
//       <h2 className="text-3xl font-semibold text-gray-800 mb-4">{apartment.apartmentId} - {apartment.buildingId}</h2>
//       <p className="text-gray-700 mb-4">{apartment.description}</p>
//       <div className="mb-4">
//         <p className="text-lg text-gray-600">Status: <span className="font-medium text-gray-800">{apartment.status}</span></p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <p className="text-lg text-gray-600">Area: <span className="font-medium text-gray-800">{apartment.area} m²</span></p>
//           <p className="text-lg text-gray-600">Bedrooms: <span className="font-medium text-gray-800">{apartment.numberOfBedrooms}</span></p>
//           <p className="text-lg text-gray-600">Bathrooms: <span className="font-medium text-gray-800">{apartment.numberOfBathrooms}</span></p>
//           <p className="text-lg text-gray-600">Price: <span className="font-medium text-green-600">${apartment.price}</span></p>
//         </div>
//         { !isBookingDisabled && (
//           <div className="flex justify-center md:justify-start">
//             <button onClick={handleBooking} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150">
//               Book Now
//             </button>
//           </div>
//         )}
//       </div>
//       {bookingStatus && <p className={`text-center md:text-left text-sm ${bookingStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{bookingMessage}</p>}
//     </div>
//     <img src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`} alt="Apartment" className="object-cover w-full h-64" />
//   </div>
// </div>
//   );
// };

// export default PropertyDetail;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { apartmentId } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const { data } = await axios.get(
          `https://localhost:7137/api/Apartments/${apartmentId}`
        );
        setApartment(data);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  const handleBooking = async () => {
    const Data = JSON.parse(localStorage.getItem("UserData"));

    if (Data.data.roleId != "Customer") {
      navigate("/login");
      return;
    }
    console.log("userid", Data.data.userId);
    try {
      // Gọi API GetCustomerByUserID để lấy customerId sử dụng userId
      const customerResponse = await axios.get(
        `https://localhost:7137/api/Customers/GetCustomerByUserID/${Data.data.userId}`
      );
      const customerId = customerResponse.data.customerId;
      if (!customerId) {
        console.error("Customer ID not found");
        setBookingStatus("error");
        setBookingMessage(
          "Customer ID not found. Please ensure you are logged in."
        );
        return;
      }

      // Tiến hành đặt phòng với customerId và apartmentId
      console.log("Cus", customerId);
      console.log("Apa", apartmentId);
      await axios.post(
        `https://localhost:7137/api/Bookings?customerId=${customerId}&apartmentId=${apartmentId}`
      );
      setBookingStatus("success");
      setBookingMessage("Booking successful!");
    } catch (error) {
      console.error("Error booking:", error);
      setBookingStatus("error");
      if (
        error.response ||
        error.response.data ||
        error.response.data.message
      ) {
        setBookingMessage(`Booking failed: ${error.response.data.message}`);
      } else {
        setBookingMessage("Booking failed. Please try again later.");
      }
    }
  };
  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
  <div className="flex flex-wrap bg-white shadow-md rounded-lg overflow-hidden">
    <div className="w-full md:w-1/2">
      <img
        src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartmentId}`}
        alt="Apartment"
        className="object-cover w-full h-full"
      />
    </div>
    <div className="w-full md:w-1/2 p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {apartment.apartmentId} - {apartment.buildingId}
      </h2>
      <p className="text-gray-700 mb-4">{apartment.description}</p>
      <div className="mb-4">
        <p className="text-lg text-gray-600">
          Status:{" "}
          <span className="font-medium text-gray-800">
            {apartment.status}
          </span>
        </p>
      </div>
      <div className="mb-6">
        <p className="text-lg text-gray-600">
          Area:{" "}
          <span className="font-medium text-gray-800">
            {apartment.area} m²
          </span>
        </p>
        <p className="text-lg text-gray-600">
          Bedrooms:{" "}
          <span className="font-medium text-gray-800">
            {apartment.numberOfBedrooms}
          </span>
        </p>
        <p className="text-lg text-gray-600">
          Bathrooms:{" "}
          <span className="font-medium text-gray-800">
            {apartment.numberOfBathrooms}
          </span>
        </p>
        <p className="text-lg text-gray-600">
          Price:{" "}
          <span className="font-medium text-green-600">
            ${apartment.price}
          </span>
        </p>
      </div>
      <button
        onClick={handleBooking}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Book Now
      </button>
      {bookingStatus && (
        <p
          className={`mt-4 text-sm ${
            bookingStatus === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {bookingMessage}
        </p>
      )}
    </div>
  </div>
</div>
  );
};

export default PropertyDetail;
