// BuildingCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuildingCard = ({ buildingId, name, describe, images, status }) => {
  const navigate = useNavigate();

  const navigateToPropertyDetails = () => {
    navigate(`/Building/${buildingId}`);
  };

  return (
    <div className="font-serif property-card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500" onClick={navigateToPropertyDetails} tabIndex="0" role="button" onKeyPress={(e) => {
      if (e.key === 'Enter') navigateToPropertyDetails();
    }}>
      {images && <img src={images} alt={name} className="property-image w-full h-56 object-cover rounded-t-lg" />}
      <div className="property-content p-4">
        <h2 className="property-title text-xl font-semibold text-gray-800">{name}</h2>
        <p className="property-description mt-2 text-sm text-gray-600">{describe}</p>
        <p className={`property-status mt-4 text-xs font-medium ${status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
      </div>
    </div>
    
  );
};

export default BuildingCard;
