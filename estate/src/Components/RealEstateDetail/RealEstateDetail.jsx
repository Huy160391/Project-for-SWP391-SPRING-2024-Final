// RealEstateDetail.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RealEstateDetail.css';

const RealEstateDetail = () => {
  const { buildingId } = useParams();
  const [propertyDetail, setPropertyDetail] = useState(null);

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);
        setPropertyDetail(response.data);
      } catch (error) {
        console.error('Error fetching property detail: ', error);
      }
    };

    fetchPropertyDetail();
  }, [buildingId]);

  if (!propertyDetail) {
    return 
  }

  return (
    <div className="property-card">
      <div className="property-card-slider">
        {/* Implement a slider here */}
      </div>
      <div className="property-card-content">
        <div className="property-card-header">
          <h2>{propertyDetail.name}</h2>
          <div className="property-card-price">{propertyDetail.price}</div>
          <div className="property-status">{propertyDetail.status}</div>
        </div>
        <div className="property-card-info">
          <p><strong>Địa chỉ:</strong> {propertyDetail.address}</p>
          <p><strong>Diện tích:</strong> {propertyDetail.area}</p>
          <p><strong>Tầng:</strong> {propertyDetail.numberOfFloors}</p>
          <p><strong>Căn hộ:</strong> {propertyDetail.numberOfApartments}</p>
        </div>
        <p className="property-card-description">{propertyDetail.describe}</p>
        <button className="property-card-buy">Đặt Mua</button>
      </div>
    </div>
  );
};

export default RealEstateDetail;
