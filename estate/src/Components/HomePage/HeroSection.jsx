import React from 'react';
import FilterAll from './FilterAll';

const HeroSection = () => {
  return (
<div className="relative bg-cover bg-center h-screen pt-16 bg-fixed font-serif" style={{ backgroundImage: `url('https://vinhome.com.vn/wp-content/uploads/2023/02/the-beverly-1.jpg')` }}>      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Hero Content */}
      <div className="relative flex items-center justify-center h-full">
        
        <div className="text-center text-white">
          <div className="mb-4">
        {/* <FilterAll /> */}
        </div>
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="mb-6">From as low as $10 per day with limited time offer discounts.</p>
          {/* Add any additional CTA or forms here */}

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
