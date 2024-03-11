import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('/path-to-your-hero-background.jpg')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="mb-6">From as low as $10 per day with limited time offer discounts.</p>
          {/* Add any additional CTA or forms here */}
          <div className="inline-flex">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l">
              Buy
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
              Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
