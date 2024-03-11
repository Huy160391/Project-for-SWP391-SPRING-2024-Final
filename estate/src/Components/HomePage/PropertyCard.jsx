import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg">
      <img className="w-full object-cover h-48" src={property.imageUrl} alt={property.title} />
      <div className="p-4 bg-white flex-grow">
        <h3 className="font-bold text-lg mb-2">{property.title}</h3>
        <p className="text-gray-700 text-base mb-2">{property.address}</p>
        <div className="flex items-baseline mt-1 mb-4">
          <span className="text-gray-900 text-xl font-semibold">{property.price}</span>
          <span className="ml-1 text-sm text-gray-600">/mo</span>
        </div>
        <div className="flex justify-start items-center text-gray-700">
          <div className="flex items-center mr-4">
            <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              {/* Example bed icon */}
            </svg>
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center mr-4">
            <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              {/* Example bath icon */}
            </svg>
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              {/* Example square footage icon */}
            </svg>
            <span>{property.sqft} SqFt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
