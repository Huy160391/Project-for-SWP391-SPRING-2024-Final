import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
const AgencyCard = ({ agent }) => {
  // Concatenate the first name and last name to form the full name
  const fullName = `${agent.firstName} ${agent.lastName}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
     <img
        className="w-full object-cover h-48"
        src={`https://localhost:7137/api/Agencies/GetImage/${agent.agencyId}`}
        alt={`Apartment ${agent.apartmentId}`}
        onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")}
      />
      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2">{fullName}</h5> {/* Use fullName here */}
        <p className="text-gray-800 mb-1">{agent.address}</p>
        <p className="text-gray-600 mb-1">{agent.phone}</p>
        <Link
          to={`/agenciesdetail/${agent.agencyId}`}
          className="inline-block mt-3 px-6 py-2 text-sm font-medium leading-6 text-center text-white uppercase transition bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-0 rounded"
        >
          Detail
        </Link>
      </div>
    </div>
  );
};

export default AgencyCard;
