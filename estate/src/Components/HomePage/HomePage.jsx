import React from 'react';

import FeaturedProjects from '../Project/FeaturedProjects ';
import HeroSection from './HeroSection';
import WhyChooseUs from './WhyChooseUs';




const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProjects  />
      <WhyChooseUs />

    </div>
  );
};

export default HomePage;
