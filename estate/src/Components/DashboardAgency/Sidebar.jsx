import React from 'react';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        {/* Add your logo or brand name here */}
        <h2>VINHOMES</h2>
      </div>
      <ul className="sidebar-nav">
        <li className="nav-item">
          <a href="/InvestorDashboard" className="nav-link">
            {/* Add an icon here if needed */}
            <span>Dashboard</span>
          </a>
        </li>
        {/* Repeat for other links */}
        <li className="nav-item">
          <a href="/logout" className="nav-link">
            {/* Add an icon here if needed */}
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
