import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">VINHOMES</div>
      <div className="menu">
        <div className="menu-item active">Dashboard</div>
        <div className="menu-item">User</div>
        <div className="menu-item">Project</div>
      </div>
    </div>
  );
};

export default Sidebar;
