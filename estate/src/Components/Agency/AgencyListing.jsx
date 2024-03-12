import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AgencyCard from './AgencyCard';

const AgencyListing = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchAgents = async () => {
    try {
      const response = await axios.get('https://localhost:7137/api/Agencies');
      // Assuming each agent has an image URL in the `Images` field
      const agentsWithImages = await Promise.all(response.data.map(async (agent) => {
        if (agent.Images && !agent.Images.startsWith('http')) {
          // If the image URL is not absolute, prepend the server base URL
          const imageUrl = `${process.env.REACT_APP_API_BASE_URL}/${agent.Images}`;
          try {
            const imageResponse = await axios.get(imageUrl, { responseType: 'blob' });
            agent.Images = URL.createObjectURL(imageResponse.data);
          } catch {
            agent.Images = 'path-to-default-image/no-image.png';
          }
        }
        return agent;
      }));
      setAgents(agentsWithImages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching agents:', error);
      setIsLoading(false);
    }
  };

  fetchAgents();
}, []);
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
