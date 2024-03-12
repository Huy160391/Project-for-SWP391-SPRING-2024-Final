import { faBath, faBed, faFilter, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApartmentCard from './ApartmentCard';

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
        const response = await axios.get(`https://localhost:7137/api/Apartments/GetApartmentsByBuildingIDForBooking?buildingId=${buildingId}`);
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
      <div className="flex justify-center my-6">
        <div className="space-x-4 flex">
          {/* Bedroom filter */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faBed} className="text-gray-700" />
            <select
              id="bedroom"
              name="bedroom"
              value={selectedBedroom}
              onChange={(e) => setSelectedBedroom(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Tất cả</option>
              {[...Array(5).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1} phòng ngủ</option>
              ))}
            </select>
          </div>
          {/* Bathroom filter */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faBath} className="text-gray-700" />
            <select
              id="bathroom"
              name="bathroom"
              value={selectedBathroom}
              onChange={(e) => setSelectedBathroom(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Tất cả</option>
              {[...Array(5).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1} phòng tắm</option>
              ))}
            </select>
          </div>
          {/* Price filter */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faMoneyBill} className="text-gray-700" />
            <input
              type="number"
              id="priceMin"
              name="priceMin"
              value={selectedPriceMin}
              onChange={(e) => setSelectedPriceMin(e.target.value)}
              placeholder="Giá từ"
              className="border p-2 rounded"
            />
            <input
              type="number"
              id="priceMax"
              name="priceMax"
              value={selectedPriceMax}
              onChange={(e) => setSelectedPriceMax(e.target.value)}
              placeholder="Giá đến"
              className="border p-2 rounded"
            />
          </div>
          {/* Filter button */}
          <button onClick={handleFilterChange} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <FontAwesomeIcon icon={faFilter} /> Lọc
          </button>
        </div>
      </div>

      {/* Apartment cards */}
      <div className="flex flex-wrap justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {apartments.map(apartment => (
          <ApartmentCard key={apartment.apartmentId} apartment={apartment} />
        ))}
      </div>
      </div>
    </>
  );
};

export default PropertyList;