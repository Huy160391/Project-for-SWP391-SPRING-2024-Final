import React from 'react';

const ListingsApartments = () => {
  // Mock data for listings
  const listings = [
    //... array of listing objects
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">DANH SÁCH BÀI ĐĂNG</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              className="w-full h-48 object-cover rounded-lg"
              src={listing.imageUrl}
              alt={listing.title}
            />
            <div className="mt-4">
              <h5 className="text-lg font-semibold">{listing.title}</h5>
              {/* Include other listing details here */}
              <p className="text-gray-600">{listing.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsApartments;
