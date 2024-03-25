import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AgencyCard from './AgencyCard';

const AgencyListing = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Agencies');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter agents based on search term
  const filteredAgents = agents.filter(agent => {
    const fullName = `${agent.firstName} ${agent.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Agency Listings</h2>
      <div className="relative w-3/4 mb-10">
        <input
          type="text"
          placeholder="Search agent..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full pr-10 focus:outline-none"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-5.2-5.2M11 15c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
          </svg>
        </span>
      </div>
      {/* Display filtered agents or "No agents found" message */}
      {filteredAgents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAgents.map(agent => (
            <AgencyCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No agents found.</div>
      )}
    </div>
  );
};

export default AgencyListing;
