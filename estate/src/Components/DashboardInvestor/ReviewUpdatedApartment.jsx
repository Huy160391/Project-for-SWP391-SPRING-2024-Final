// ViewPostPage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewUpdateApartment = () => {
  const [apartment, setApartment] = useState(null);
  const { apartmentId } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Adjust this endpoint as necessary
        const response = await axios.get(
          `https://localhost:7137/api/Apartments/${apartmentId}`
        );
        setApartment(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
        // Optionally, handle errors more gracefully here
      }
    };

    fetchPostDetails();
  }, [apartmentId]);

  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 max-w-5xl mx-auto p-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <h1 className="text-4xl font-bold text-gray-900 text-center py-8">
            View Apartment Detail
          </h1>
          <div className="px-8 py-4 bg-gray-50 text-center">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back
            </button>
          </div>
          <img
            className="w-full object-cover h-48"
            src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`}
            alt={`Apartment ${apartment.apartmentId}`}
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/400x300")
            }
          />

          <div className="p-8 space-y-4">
            <p className="text-xl">
              <span className="font-semibold">Apartment:</span>{" "}
              {apartment.apartmentId}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Description:</span>{" "}
              {apartment.description}
            </p>

            <p className="text-xl">
              <span className="font-semibold">Bedrooms:</span>{" "}
              {apartment.numberOfBedrooms}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Bathrooms:</span>{" "}
              {apartment.numberOfBathrooms}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Furniture:</span>{" "}
              {apartment.furniture}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Area:</span> {apartment.area}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Price:</span> {apartment.price}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Floor:</span>{" "}
              {apartment.floorNumber}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Status:</span> {apartment.status}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Agency ID:</span>{" "}
              {apartment.agencyId}
            </p>
            {/* Include additional post details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewUpdateApartment;
