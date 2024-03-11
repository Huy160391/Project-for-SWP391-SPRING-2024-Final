import React from 'react';
import { FaDollarSign, FaHome, FaKey } from 'react-icons/fa'; // Example icons
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaHome className="text-pink-500 w-8 h-8" />,
      title: 'Trusted By Thousands',
      description: 'Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.'
    },
    {
      icon: <FaKey className="text-pink-500 w-8 h-8" />,
      title: 'Wide Range Of Properties',
      description: 'Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.'
    },
    {
      icon: <FaDollarSign className="text-pink-500 w-8 h-8" />,
      title: 'Financing Made Easy',
      description: 'Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.'
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">Why Choose Us</h2>
        <p className="text-center text-gray-600 mb-12">We provide full service at every step.</p>
        <div className="flex flex-wrap justify-center -m-4">
          {features.map((feature, index) => (
            <div key={index} className="lg:w-1/3 px-4 mb-8">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;