import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AgencyCard from './AgencyCard';

const AgencyListing = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Use Axios to make a GET request to the API
        const response = await axios.get('https://localhost:7137/api/Agencies');
        // Once data is received, update the agents state with this data
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        // Set isLoading to false regardless of the outcome of the try/catch
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Agency Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {agents.map(agent => (
          <AgencyCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgencyListing;
