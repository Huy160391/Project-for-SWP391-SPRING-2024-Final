import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const InvestorDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
  });

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

  return (
    <div className="investor-dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="statistics">
          <div className="stat-card">
            <span>Total User</span>
            <strong>{stats.totalUsers}</strong>
          </div>
          <div className="stat-card">
            <span>Total Project</span>
            <strong>{stats.totalProjects}</strong>
          </div>
        </section>
        <section className="detailed-stats">
          <Link to="/managerusers" className="details-card">
            <span>User</span>
          </Link>
          <Link to="/managerbuildings" className="details-card">
            <span>Manager Building</span>
          </Link>
          <Link to="/managerpost" className="details-card">
            <span>Manager Post</span>
          </Link>
          <Link to="/managerdistribute" className="details-card">
            <span>Distribute Project</span>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default InvestorDashboard;
