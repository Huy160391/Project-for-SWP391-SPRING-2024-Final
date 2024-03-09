import React from 'react';
import './DashboardAgency.css'; // Make sure you have your CSS styles defined here

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <MainContent />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">VINHOMES</div>
      <nav className="navigation">
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/logout">Logout</a>
      </nav>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="main-content">
      <SearchBar />
      <Stats />
      <QuickLinks />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search here" />
      <button>🔍</button>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="stats">
      <div className="stat-item">
        <h3>Total Post</h3>
        <p>40</p>
      </div>
      <div className="stat-item">
        <h3>Total Transaction</h3>
        <p>32</p>
      </div>
    </div>
  );
};

const QuickLinks = () => {
  return (
    <div className="quick-links">
      <div className="quick-link-item">
        <h4>Post</h4>
        {/* Icon here */}
      </div>
      <div className="quick-link-item">
        <h4>Transaction</h4>
        {/* Icon here */}
      </div>
    </div>
  );
};

export default Dashboard;
