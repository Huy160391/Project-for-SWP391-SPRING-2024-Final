import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewOderBillOfCustomer = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // Mock API call to get order by ID
        const orderResponse = await axios.get(
          `https://localhost:7137/api/Orders/GetAllOderByOrderId/${orderId}`
        );
        const orders = orderResponse.data;

        const orderDetailsWithExtraInfo = await Promise.all(
          orders.map(async (order) => {
            // Fetch apartment details
            const apartmentResponse = await axios.get(
              `https://localhost:7137/api/Apartments/${order.apartmentId}`
            );
            const apartment = apartmentResponse.data;

            // Fetch building details
            const buildingResponse = await axios.get(
              `https://localhost:7137/api/Buildings/${apartment.buildingId}`
            );
            const building = buildingResponse.data;

            const projectResponse = await axios.get(
              `https://localhost:7137/api/Projects/${building.projectId}`
            );
            const project = projectResponse.data;

            // Fetch agency details
            const agencyResponse = await axios.get(
              `https://localhost:7137/api/Agencies/${order.agencyId}`
            );
            const agency = agencyResponse.data;
            // New code to fetch apartment name
            const apartmentNameResponse = await axios.get(
              `https://localhost:7137/api/Apartments/GetRoomNumberByApartmentId/${order.apartmentId}`
            );
            const apartmentName = apartmentNameResponse.data;
            return {
              ...order,
              apartmentImage: `https://localhost:7137/api/Apartments/GetApartmentImage/${order.apartmentId}`,
              apartmentName, // Added apartment name
              apartmentNumberOfBedrooms: apartment.numberOfBedrooms,
              apartmentNumberOfBathrooms: apartment.numberOfBathrooms,
              apartmentArea: apartment.area,
              apartmentFloorNumber: apartment.floorNumber,
              buildingName: building.name,
              buildingAddress: building.address,
              buildingTypeOfRealEstate: building.typeOfRealEstate,
              agencyName: `${agency.firstName} ${agency.lastName}`,
              agencyAddress: agency.address,
              agencyPhone: agency.phone,
              projectName: project.name,
            };
          })
        );

        setOrderDetails(orderDetailsWithExtraInfo);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-12 p-8 font-serif">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Order Bill Details
      </h1>
      {orderDetails.map((detail, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row bg-white border-t shadow-xl rounded-lg overflow-hidden mb-8"
        >
          <div className="md:w-1/2">
            <img
              src={detail.apartmentImage}
              alt="Apartment"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 flex-grow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              <span className="font-medium">Project Name:</span>{" "}
              {detail.projectName}
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Building Name:</span>{" "}
              {detail.buildingName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Building Address:</span>{" "}
              {detail.buildingAddress}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Type of Real Estate:</span>{" "}
              {detail.buildingTypeOfRealEstate}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span> {detail.date}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Apartment Name:</span>{" "}
              {detail.apartmentName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Apartment Number Of Bedrooms:</span>{" "}
              {detail.apartmentNumberOfBedrooms}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">
                Apartment Number Of Bathrooms:
              </span>{" "}
              {detail.apartmentNumberOfBathrooms}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Apartment Area:</span>{" "}
              {detail.apartmentArea}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Apartment Floor Number:</span>{" "}
              {detail.apartmentFloorNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span> {detail.status}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Agency Name:</span>{" "}
              {detail.agencyName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Agency Address:</span>{" "}
              {detail.agencyAddress}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Agency Phone:</span>{" "}
              {detail.agencyPhone}
            </p>
            <h3 className="text-2xl font-bold text-green-600">
              Total Amount:{" "}
              {detail.totalAmount ? `${detail.totalAmount}` : "N/A"}
            </h3>
          </div>
        </div>
      ))}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
        Back
      </button>
    </div>
  );
};

export default ViewOderBillOfCustomer;
