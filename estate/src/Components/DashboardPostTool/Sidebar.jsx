import React from 'react';

const Sidebar = () => {
  return (
    <nav className="sidebar min-h-screen w-64 bg-gray-800 text-white">
    <div className="sidebar-brand p-4 border-b border-white">
        <h2 className="text-3xl font-semibold">VINHOMES</h2>
    </div>
    <ul className="sidebar-nav mt-4">
        <li className="nav-item ">
            <a href="/InvestorDashboard" className="nav-link flex items-center p-4 hover:bg-gray-700 transition-colors duration-200">
                {/* Insert icon here if needed */}
                <span className="ml-2 text-white text-1xl font-semibold">Dashboard</span>
            </a>
        </li>
        {/* Repeat for other links */}
        <li className="nav-item">
            <a href="/logout" className="nav-link flex items-center p-4 hover:bg-gray-700 transition-colors duration-200">
                {/* Insert icon here if needed */}
                <span className="ml-2 text-white text-1xl font-semibold">Logout</span>
            </a>
        </li>
    </ul>
</nav>

  );
};

export default Sidebar;
