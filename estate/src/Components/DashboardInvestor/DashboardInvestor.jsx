import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardInvestor.css'; // This is where you would define your CSS
import Sidebar from './Sidebar';
const InvestorDashboard = () => {
  // Sample data, you would replace this with actual data, probably fetched from an API
  const stats = {
    totalUsers: 932,
    totalProjects: 40,
    totalTransactions: 32,
  };

  return (
    <div className="investor-dashboard">
      <Sidebar /> {/* Here we include the Sidebar component */}
      <main className="main-content">
        <section className="statistics">
          {/* Map through stats to create stat cards */}
          <div className="stat-card">
            <span>Total User</span>
            <strong>{stats.totalUsers}</strong>
          </div>
          <div className="stat-card">
            <span>Total Project</span>
            <strong>{stats.totalProjects}</strong>
          </div>
          <div className="stat-card">
            <span>Total Transaction</span>
            <strong>{stats.totalTransactions}</strong>
          </div>
        </section>
        <section className="detailed-stats">
          {/* User, Project, and Transaction Cards */}
          <Link to="/managerusers" className="details-card">
    <span>User</span>
    {/* User icon would go here */}
  </Link>
  <Link to="/managerbuildings" className="details-card">
            <span>Project</span>
            {/* Project icon would go here */}
            </Link>
            <Link to="/managertransaction" className="details-card">
            <span>Transaction</span>
            {/* Project icon would go here */}
            </Link>
            <Link to="/managerdistribute" className="details-card">
            <span>Distribute Project</span>
            {/* Project icon would go here */}
            </Link>
        </section>
      </main>
    </div>
  );
};

export default InvestorDashboard;
