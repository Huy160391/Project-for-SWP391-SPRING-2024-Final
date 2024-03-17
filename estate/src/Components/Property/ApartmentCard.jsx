import React from 'react';
import { Link } from 'react-router-dom';

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl m-4">
      <img
        className="w-full object-cover h-48"
        src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`}
        alt={`Apartment ${apartment.apartmentId}`}
        onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")}
      />
      <div className="p-4 bg-white flex-grow">
        <h3 className="font-bold text-xl mb-2">{apartment.name || `Apartment: ${typeof apartment.apartmentId === 'string' && apartment.apartmentId.includes(":") ? apartment.apartmentId.split(":").pop() : apartment.apartmentId}`}</h3> {/* Adjust based on actual property names. */}
        <div className="text-gray-700 text-base mb-4">
          <p>Bedrooms: {apartment.numberOfBedrooms}</p>
          <p>Bathrooms: {apartment.numberOfBathrooms}</p>
          <p>Price: ${apartment.price}</p>
        </div>
        <Link
          to={`/propertydetail/${apartment.apartmentId}`}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default ApartmentCard;