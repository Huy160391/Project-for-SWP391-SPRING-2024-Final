import emailjs from 'emailjs-com';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { apartmentId } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState({});
  const [building, setBuilding] = useState({});
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [depositAmount, setDepositAmount] = useState(null);
  const [depositAmountOptions, setDepositAmountOptions] = useState(false);
  const [userData, setUserData] = useState(null);
  const [transactionCode, setTransactionCode] = useState("");
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/${apartmentId}`);
        setApartment(apartmentResponse.data);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  useEffect(() => {
    emailjs.init("e8nVRT8-ytw0WVA70");
  }, []);

  const sendEmail = () => {
    emailjs.send('Aptx4869', 'template_c0nsj3h', {
      apartmentID: apartment.apartmentId,
      buildingID: apartment.buildingId,
      downPayment: apartment.price * depositAmount,
      transactionCode: transactionCode,
    })
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  };

  const handleTransactionCodeChange = (event) => {
    setTransactionCode(event.target.value);
  };

  useEffect(() => {

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


  const handleBooking = async (event) => {
    event.preventDefault();
    const userDataString = localStorage.getItem("UserData");
    if (!userDataString) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(userDataString);

    if (userData.data.roleId !== "Customer") {
      navigate("/login");
      return;
    }

    setDepositAmountOptions(true);
    setUserData(userData);
  };

  const handleDepositSelect = (percentage) => {
    const depositAmount = apartment.price * percentage;
    setDepositAmount(depositAmount);
  };
  const [showDepositAmount, setShowDepositAmount] = useState(false);

  const handleImageUpload = (event) => {
    setUserImage(event.target.files[0]);
  };

  const handleConfirmBooking = async (event) => {
    event.preventDefault();
    try {
      const customerResponse = await axios.get(
        `https://localhost:7137/api/Customers/GetCustomerByUserID/${userData.data.userId}`
      );
      const customerId = customerResponse.data.customerId;
      if (!customerId) {
        console.error("Customer ID not found");
        setBookingStatus("error");
        setBookingMessage("Customer ID not found. Please ensure you are logged in.");
        return;
      }

      const formData = new FormData();

      // Gửi dữ liệu hình ảnh
      if (userImage) {
        formData.append('FileImage', userImage); // Đặt tên tham số là 'FileImage'
      }

      const response = await axios.post(
        `https://localhost:7137/${customerId}/${apartmentId}/${depositAmount}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );

      // Xử lý response từ backend
      console.log("Booking response:", response.data);
      setBookingStatus("success");
      setBookingMessage("Booking successful!");
      sendEmail();
      alert("success booking");
    } catch (error) {
      console.error("Error booking:", error);
      setBookingStatus("error");
      if (error.response && error.response.data && error.response.data.message) {
        setBookingMessage("Booking failed: " + error.response.data.message);
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
            className="object-cover w-full h-80"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between p-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Apartment: {typeof apartment.apartmentId === 'string' && apartment.apartmentId.includes(":") ? apartment.apartmentId.split(":").pop() : apartment.apartmentId} - {building.name}
            </h2>
            <p className="text-gray-700 mb-4">{apartment.description}</p>
            <div className="mb-6">
              <p className="text-lg text-gray-600">
                Status:{" "}
                <span className="font-medium text-gray-800">
                  {apartment.status}
                </span>
              </p>
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
          </div>
          <div>
            <button
              onClick={handleBooking}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Book Now
            </button>
            {depositAmountOptions && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-gray-600">Select Deposit Amount:</p>
                  <div className="flex items-center space-x-4 mr-80">
                    <button
                      onClick={() => {
                        handleDepositSelect(0.5);
                        setShowDepositAmount(true);
                      }}
                      className={`py-1 px-3 rounded ${depositAmount === (apartment.price * 0.5) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                    >
                      50%
                    </button>
                    <button
                      onClick={() => {
                        handleDepositSelect(0.2);
                        setShowDepositAmount(true);
                      }}
                      className={`py-1 px-3 rounded ${depositAmount === (apartment.price * 0.2) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                    >
                      20%
                    </button>
                  </div>
                </div>
                {showDepositAmount && (
                  <div className='mb-4'>
                    <p className="text-lg text-gray-600">Deposit Amount:{" "}
                      <span className="font-medium text-green-600 text-2xl">
                        ${depositAmount}
                      </span>
                    </p>
                    <p className="text-lg text-gray-600 mt-2">Scan QR code to pay</p>
                    <div className="w-40 h-40 flex items-center justify-center border border-gray-300 rounded-md">
                      <img
                        src={`https://www.meme-arsenal.com/memes/3d983bc786e0fea7629d7ad884f3c417.jpg`}
                        alt="QR Code"
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="transactionCode" className="text-lg text-gray-600">Transaction Code:</label>
                      <input type="text" id="transactionCode" value={transactionCode} onChange={handleTransactionCodeChange} className="ml-3 shadow-md mt-2 p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                      {userImage && (
                        <div className="mb-2">
                          <img
                            src={typeof userImage === 'string' ? userImage : URL.createObjectURL(userImage)}
                            alt="Uploaded"
                            className="max-w-full h-auto rounded-md"
                          />
                        </div>
                      )}
                      <div>
                        <label htmlFor="paymentImage" className="text-lg text-gray-600">Upload Payment Image:</label>
                        <input type="file" id="paymentImage" onChange={handleImageUpload} className="ml-3 shadow-md mt-2 p-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <button
                      onClick={handleConfirmBooking}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Confirm Booking
                    </button>
                  </div>

                )}


              </div>
            )}
            {bookingStatus && (
              <p
                className={`mt-4 text-sm ${bookingStatus === "success" ? "text-green-500" : "text-red-500"
                  }`}
              >
                {bookingMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>


  );
};

export default PropertyDetail;