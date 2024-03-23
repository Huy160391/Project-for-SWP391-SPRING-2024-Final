import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

const AgentProfile = () => {
  const { agencyId } = useParams(); // Use useParams to get the agencyId from URL
  const [agent, setAgent] = useState(null);
 
  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const agencyResponse = await axios.get(`https://localhost:7137/api/Agencies/${agencyId}`);
        setAgent(agencyResponse.data);
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };

    fetchAgency();
  }, [agencyId]); // Dependency array to re-run the effect if `agencyId` changes

  if (!agent) {
    return <div>Loading...</div>;
  }

  const fullName = `${agent.firstName} ${agent.lastName}`;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={`https://localhost:7137/api/Agencies/GetImage/${agent.agencyId}`}
          alt={agent.name}
        />
        <div>
        <h2 className="text-2xl font-bold">{fullName}</h2>
          <p className="text-gray-600">{agent.address}</p>
          <p className="text-blue-600">{agent.phone}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">GIỚI THIỆU</h3>
        <p className="text-gray-600 mt-2">Chào mừng bạn đến với những dự án </p>
      </div>
    </div>
  );
};

export default AgentProfile;
