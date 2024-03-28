import React from 'react';

import FeaturedProjects from '../Project/FeaturedProjects ';
import HeroSection from './HeroSection';
import WhyChooseUs from './WhyChooseUs';
import HomePageDecorationBuilding from './HomePageDecorationBuilding';
import HomePageDecoration2 from './HomePageDecoration2';
import HomePageDecoration3 from './HomePageDecoration3';
import HomePageDecorationAparment from './HomePageDecorationAparment';

const HomePage = () => {
  return (
    <div>
      
      <HeroSection />
   
      <FeaturedProjects  />
      <HomePageDecoration2 />
      <HomePageDecorationBuilding />
      <HomePageDecoration3 />
      <HomePageDecorationAparment/>
      <WhyChooseUs />
      
    </div>
  );
};

export default HomePage;
