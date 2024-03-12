import React from 'react';

const AgencyCard = ({ agent }) => {
  // Concatenate the first name and last name to form the full name
  const fullName = `${agent.firstName} ${agent.lastName}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={agent.images} alt={fullName} />
      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2">{fullName}</h5> {/* Use fullName here */}
        <p className="text-gray-800 mb-1">{agent.agencyId}</p>
        <p className="text-gray-600 mb-1">{agent.phone}</p>
      </div>
    </div>
  );
};

export default AgencyCard;
