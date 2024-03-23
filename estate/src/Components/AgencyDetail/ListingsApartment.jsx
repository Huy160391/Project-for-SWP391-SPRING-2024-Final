import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
const ListingsApartments = () => {
  const [listings, setListings] = useState([]);
  const { agencyId } = useParams(); // Use useParams to get the agencyId from URL

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Apartments/ListApartmentByAgency?agencyId=${agencyId}`);
        // Filter the listings to include only those with a status of 'Updated'
        const updatedListings = response.data.filter(listing => listing.status === 'Updated');
        setListings(updatedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [agencyId]); // Re-fetch if `agencyId` changes

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">DANH SÁCH BÀI ĐĂNG</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.agencyId} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              className="w-full h-48 object-cover rounded-lg"
              src={`https://localhost:7137/api/Apartments/GetApartmentImage/${listing.apartmentId}`}
              alt={listing.title}
            />
            <div className="mt-4">
            <h3 className="font-bold text-xl mb-2">{listing.name || `Apartment: ${typeof listing.apartmentId === 'string' && listing.apartmentId.includes(":") ? listing.apartmentId.split(":").pop() : listing.apartmentId}`}</h3> {/* Adjust based on actual property names. */}
              <p>Bedrooms: {listing.numberOfBedrooms}</p>
              <p>Bathrooms: {listing.numberOfBathrooms}</p>
              <p>Price: ${listing.price}</p>
            </div>
            <Link
          to={`/propertydetail/${listing.apartmentId}`}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150"
        >
          View More
        </Link>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ListingsApartments;
