// RealEstateCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RealEstateCard = ({ buildingId, name, describe, images, status }) => {
  const navigate = useNavigate();

  const navigateToPropertyDetails = () => {
    navigate(`/realestate/${buildingId}`);
  };

  return (
    <div className="property-card" onClick={navigateToPropertyDetails} tabIndex="0" role="button" onKeyPress={(e) => {
      if (e.key === 'Enter') navigateToPropertyDetails();
    }}>
      {images && <img src={images} alt={name} className="property-image" />}
      <div className="property-content">
        <h2 className="property-title">{name}</h2>
        <p className="property-description">{describe}</p>
        <p className="property-status">{status}</p>
      </div>
    </div>
  );
};

export default RealEstateCard;
