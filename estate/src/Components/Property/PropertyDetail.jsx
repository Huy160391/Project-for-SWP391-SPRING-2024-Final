import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import './PropertyDetail.css'


const PropertyDetail = () => {
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState({});

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Apartments/${apartmentId}`);
        setApartment(response.data);
      } catch (error) {
        console.error('Error fetching apartment:', error);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  if (!apartment) {
    return <div>Errrrrrrrrrrrrrrrrrr</div>;
  }


  return (
    <>
      <Header />

      <div className="property-detail">
        <div className="top-section">
          <h2>{apartment.apartmentId} - {apartment.buildingId}</h2>
          <p>{apartment.description}</p>
          <p>{apartment.status}</p>
        </div>
        <div className="info-section">
          <p>Area: {apartment.area} m2</p>
          <p>
            {apartment.numberOfBedrooms} phòng ngủ - {apartment.numberOfBathrooms} phòng tắm
          </p>
          <p>Price: ${apartment.price}</p>
        </div>
        <button className="buy-button">Đặt mua</button>
      </div>
    </>
  );
};

export default PropertyDetail;
