import React from "react";
import AgentsSection from "./AgentsSection";
import BuildingList from "./BuildingList";
import TestimonialsSection from "./TestimonialsSection";

const HomePage = () => {
  return (
    <div style={{position: 'relative', top: '116px', width:"100vw", height:'91vh'}}>
      {/* <IntroSection /> */}
      <img
        src="/Vinhomes.jpg"
        alt="" 
        style={{position:'absolute', width: '100vw'}}
      />

      {/* <ServicesSection /> */}
      <BuildingList />
      <AgentsSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
