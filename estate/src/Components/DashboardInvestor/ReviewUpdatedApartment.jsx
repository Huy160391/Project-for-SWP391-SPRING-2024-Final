import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReviewUpdatedApartment = () => {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const [apartment, setApartment] = useState({});
    const [building, setBuilding] = useState({});
    const [bookingStatus, setBookingStatus] = useState(null);
    const [bookingMessage, setBookingMessage] = useState("");
    const [depositAmount, setDepositAmount] = useState(null);
    const [depositAmountOptions, setDepositAmountOptions] = useState(false);
    const [userData, setUserData] = useState(null);
    const [imageFile, setImageFile] = useState(null);

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

    const handleBooking = async () => {
        // Check if user is logged in
        const userDataString = localStorage.getItem("UserData");
        if (!userDataString) {
            navigate("/login");
            return;
        }
        const userData = JSON.parse(userDataString);

        // Check user role
        if (userData.data.roleId !== "Customer") {
            navigate("/login");
            return;
        }

        // Show deposit amount options
        setDepositAmountOptions(true);
        setUserData(userData);
    };

    const handleDepositSelect = (amount) => {
        setDepositAmount(amount);
    };

    // Xử lý khi người dùng chọn hình ảnh
    const handleImageUpload = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleConfirmBooking = async () => {
        try {

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                // Gửi request POST để tải lên hình ảnh
                await axios.post(
                    `https://localhost:7137/api/Apartments/UploadImage/${apartmentId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }
            // Call booking API with selected deposit amount
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

            await axios.post(
                `https://localhost:7137/api/Bookings?customerId=${customerId}&apartmentId=${apartmentId}&depositAmount=${depositAmount}`
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
    );
};

export default ReviewUpdatedApartment;
