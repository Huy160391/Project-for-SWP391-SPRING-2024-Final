import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const InvestorDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    
  });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Define the function to fetch stats from the API
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Projects/GetNumberOfProjectAndNumberOfUser');
        setStats({
          totalUsers: response.data.numberOfUsers,
          totalProjects: response.data.numberOfProjects,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Handle error appropriately in a real app
      }
    };


    // Call the fetch function
    fetchStats();
  }, []); // The empty array ensures this effect runs only once after the component mounts
  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };
  return (
    <div className="investor-dashboard bg-gray-100 min-h-screen p-8">
      <main className="main-content">
        <section className="statistics grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="stat-card bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center">
            <span className="text-gray-600 font-semibold">Total User</span>
            <strong className="text-xl font-bold">{stats.totalUsers}</strong>
          </div>
          <div className="stat-card bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center">
            <span className="text-gray-600 font-semibold">Total Project</span>
            <strong className="text-xl font-bold">{stats.totalProjects}</strong>
          </div>
        </section>
        <section className="detailed-stats grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Link to="/managerusers" className="details-card bg-white shadow-lg rounded-lg p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out">
            <span>User</span>
          </Link>
          <Link to="/managerbuildings" className="details-card bg-white shadow-lg rounded-lg p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out">
            <span>Manage Building</span>
          </Link>
          <Link to="/managerpost" className="details-card bg-white shadow-lg rounded-lg p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out">
            <span>Manage Post</span>
          </Link>
          <Link to="/managerdistribute" className="details-card bg-white shadow-lg rounded-lg p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out">
            <span>Distribute Project</span>
          </Link>
          <Link to="/managerapartment" className="details-card bg-white shadow-lg rounded-lg p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out">
            <span>Manager Apartment of Agency</span>
          </Link>

        </section>
        <button
          onClick={handleBackClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Back to Home
        </button>
      </main>
    </div>
  );
};

export default InvestorDashboard;
