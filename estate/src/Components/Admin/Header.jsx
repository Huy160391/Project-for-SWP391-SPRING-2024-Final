import React from 'react';
const Header = () => {
  return (
    <div className="header">
      <div className="search-container">
        <input type="text" placeholder="Search here..." />
        <button className="search-button">🔍</button>
      </div>
      <div className="user-info">
        <span className="user-name">Nabila A.</span>
        <span className="profile-icon">👤</span>
      </div>
    </div>
  );
};

export default Header;
