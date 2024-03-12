import React from 'react';

import ListingsApartments from './ListingsApartment';
import AgentProfile from './AgencyProfile';


const AgentsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <AgentProfile />
      <ListingsApartments />
    </div>
  );
};

export default AgentsPage;
