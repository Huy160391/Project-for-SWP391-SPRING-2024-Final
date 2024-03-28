import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    // Consolidate your detailed stats links
    const detailedStatsLinks = [
        { path: '/managerusers', name: 'User' },
        { path: '/managerbuildings', name: 'Manage Building' },
        { path: '/managerpost', name: 'Manage Post' },
        { path: '/managerdistribute', name: 'Distribute Project' },
        { path: '/managerapartment', name: 'Manager Apartment of Agency' },
        { path: '/confirmbookingManager', name: 'Confirm Booking Manager' },
        { path: '/confimOderManager', name: 'Confirm Order Manager' },
        { path: '/viewHistoryOrder', name: 'View History Order' },
    ];

    return (
      <div className="flex min-h-screen bg-gray-100 font-serif text-amber-100">
      <div className=" mx-auto  bg-white rounded-lg shadow-lg w-full">
          <h2 className="text-3xl  text-center text-gray-800 mb-8">Investor Dashboard</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                  <span className="text-gray-600 ">Total Users</span>
                  <strong className="block text-3xl font-bold text-blue-600 mt-2">{stats.totalUsers}</strong>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                  <span className="text-gray-600 ">Total Projects</span>
                  <strong className="block text-3xl font-bold text-blue-600 mt-2">{stats.totalProjects}</strong>
              </div>
          </section>
          <section className="grid grid-cols-1  md:grid-cols-4 gap-8 px-4 mt-8">
              {detailedStatsLinks.map((link, index) => (
                  <Link
                      to={link.path}
                      key={index}
                      className="flex  items-center justify-center h-48 bg-gradient-to-r from-blue-500 to-blue-700 
                       text-xl  rounded-lg shadow-md 
                      hover:from-blue-600 hover:to-blue-800 transform hover:-translate-y-1 hover:scale-105 
                      transition duration-300 ease-in-out"
                  >
                      <span className="text-lg  text-amber-100">{link.name}</span>
                  </Link>
              ))}
          </section>
          <button
              onClick={handleBackClick}
              className="mt-8 mx-auto block px-6 py-3 bg-blue-500 text-amber-100  rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
              Back to Home
          </button>
      </div>
  </div>
  
    );
};

export default InvestorDashboard;
