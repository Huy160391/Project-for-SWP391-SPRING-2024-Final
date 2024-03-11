import React from 'react';

const AgencyCard = ({ firstName, lastName, address, phone, email, image }) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="max-w-sm w-full lg:max-w-full flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500">
    <div className="h-48 lg:h-auto w-full flex-none bg-cover text-center overflow-hidden rounded-t-lg" style={{ backgroundImage: `url(${image})` }}>
    </div>
    <div className="border-r border-b border-l border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">{fullName}</h2>
        <p className="text-sm text-gray-600 mt-2">{address}</p>
        <p className="text-sm text-gray-600">{phone}</p>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">Liên hệ</button>
      </div>
    </div>
  </div>
  
  );
};

export default AgencyCard;
