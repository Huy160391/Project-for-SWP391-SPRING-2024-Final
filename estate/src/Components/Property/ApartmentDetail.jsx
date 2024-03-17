
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
  const [building, setBuilding] = useState({});

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/${apartmentId}`);
        console.log("data", apartmentResponse);
        setApartment(apartmentResponse.data);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  useEffect(() => {
    // Kiểm tra trước khi gọi API
    if (apartment.buildingId) {
      const fetchBuilding = async () => {
        try {
          const response = await axios.get(`https://localhost:7137/api/Buildings/${apartment.buildingId}`);
          setBuilding(response.data);
        } catch (error) {
          console.error("Error fetching building data:", error);
        }
      };
  
      fetchBuilding();
    }
  }, [apartment.buildingId]);

  console.log("a", apartmentId);
  const handleBooking = async () => {
    const DataString = localStorage.getItem("UserData");
    if (!DataString) {
      navigate("/login");
      return;
    }
    const Data = JSON.parse(DataString);
  
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
      console.log("apd", apartment.numberOfBedrooms);
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
        setBookingMessage(`Booking failed: Aready Booking`);
      } else {
        setBookingMessage("Booking failed. Please try again later.");
      }
    }
  };

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
          Apartment: {typeof apartment.apartmentId === 'string' && apartment.apartmentId.includes(":") ? apartment.apartmentId.split(":").pop() : apartment.apartmentId} - {building.name}
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
