import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { faBath, faBed, faFilter, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PropertyList.css';

const PropertyList = () => {
  const { buildingId } = useParams();
  const [originalApartments, setOriginalApartments] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [selectedBedroom, setSelectedBedroom] = useState('');
  const [selectedBathroom, setSelectedBathroom] = useState('');
  const [selectedPriceMin, setSelectedPriceMin] = useState('');
  const [selectedPriceMax, setSelectedPriceMax] = useState('');

  useEffect(() => {



    const fetchApartments = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Apartments/GetApartmentsByBuildingID?buildingId=${buildingId}`);
        setOriginalApartments(response.data);
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };
    fetchApartments();
  }, [buildingId]);

  const handleFilterChange = () => {
    if (selectedPriceMin && parseInt(selectedPriceMin) < 0) {
      alert('Giá tiền không thể là số âm');
      return;
    }
    if (selectedPriceMax && parseInt(selectedPriceMax) < 0) {
      alert('Giá tiền không thể là số âm');
      return;
    }
    if (selectedPriceMin && selectedPriceMax && parseInt(selectedPriceMin) > parseInt(selectedPriceMax)) {
      alert('Giá tiền không hợp lệ');
      return;
    }

    let filteredApartments = [...originalApartments];
    if (selectedBedroom) {
      filteredApartments = filteredApartments.filter(apartment => apartment.numberOfBedrooms === parseInt(selectedBedroom));
    }
    if (selectedBathroom) {
      filteredApartments = filteredApartments.filter(apartment => apartment.numberOfBathrooms === parseInt(selectedBathroom));
    }
    if (selectedPriceMin) {
      filteredApartments = filteredApartments.filter(apartment => apartment.price >= parseInt(selectedPriceMin));
    }
    if (selectedPriceMax) {
      filteredApartments = filteredApartments.filter(apartment => apartment.price <= parseInt(selectedPriceMax));
    }
    setApartments(filteredApartments);
  };

  return (
    <>
      <div className="filter-container">
        <div className="filter-bar">
          <div className="filter-item">
            <FontAwesomeIcon icon={faBed} />
            <label htmlFor="bedroom"></label>
            <select id="bedroom" name="bedroom" value={selectedBedroom} onChange={(e) => setSelectedBedroom(e.target.value)}>
              <option value="">Tất cả</option>
              {[...Array(5).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1} phòng ngủ</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <FontAwesomeIcon icon={faBath} />
            <label htmlFor="bathroom"></label>
            <select id="bathroom" name="bathroom" value={selectedBathroom} onChange={(e) => setSelectedBathroom(e.target.value)}>
              <option value="">Tất cả</option>
              {[...Array(5).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1} phòng tắm</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <FontAwesomeIcon icon={faMoneyBill} />
            <label htmlFor="priceMin"></label>
            <input type="number" id="priceMin" name="priceMin" value={selectedPriceMin} onChange={(e) => setSelectedPriceMin(e.target.value)} placeholder="Giá từ" />
            <label htmlFor="priceMax"></label>
            <input type="number" id="priceMax" name="priceMax" value={selectedPriceMax} onChange={(e) => setSelectedPriceMax(e.target.value)} placeholder="Giá đến" />
          </div>
          <div className="filter-item">
            <button onClick={handleFilterChange}><FontAwesomeIcon icon={faFilter} /> Lọc</button>
          </div>
        </div>
      </div>

      <div className="property-list">
        <div className="apartment-container">
          {apartments.map(apartment => (
            <div key={apartment.apartmentId} className="apartment-card">
              <div className="apartment-image">
                <img src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`} alt="Apartment" /> {/* Sử dụng đường dẫn hình ảnh từ API */}
              </div>
              <div className="apartment-details">
                <p>Apartment ID: {apartment.apartmentId}</p>
                <p>Number of Bedrooms: {apartment.numberOfBedrooms}</p>
                <p>Number of Bathrooms: {apartment.numberOfBathrooms}</p>
                <p>Price: ${apartment.price}</p>
                <Link to={`/propertydetail/${apartment.apartmentId}`} className="view-more-button">Xem thêm</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyList;
