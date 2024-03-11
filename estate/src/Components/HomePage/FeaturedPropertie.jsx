import React from 'react';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  // Mock data for properties, replace with your actual data structure
  const properties = [
    {
      id: 1,
      image: '/path-to-image-1.jpg', // replace with your image path
      title: 'Luxury Family Home',
      address: '1421 San Pedro St, Los Angeles, CA 90015',
      price: '$13,000/mo',
      beds: 3,
      baths: 2,
      sqft: 2800,
    },
    // ... more properties
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
