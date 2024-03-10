import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
    return <div className="text-red-500">Error fetching apartment</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{apartment.apartmentId} - {apartment.buildingId}</h2>
          <p className="text-gray-600 mb-2">{apartment.description}</p>
          <p className="text-gray-600 mb-4">{apartment.status}</p>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">Area: {apartment.area} m2</p>
              <p className="text-sm text-gray-600">{apartment.numberOfBedrooms} phòng ngủ - {apartment.numberOfBathrooms} phòng tắm</p>
              <p className="text-sm text-gray-600">Price: ${apartment.price}</p>
            </div>
            <Link to={`/editproperty/${apartment.apartmentId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit(Tạm thời)
            </Link>
          </div>
        </div>
        <img src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`} alt="Apartment" className="object-cover w-full h-64" />
      </div>
    </div>
  );
};

export default PropertyDetail;
