import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure to create a CSS file named Header.css

const Header = () => {
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">VINHOMES</div>
      <nav className="navigation">
        <a href="/buy">Buy</a> {/* Consider changing these to <Link> as well for SPA behavior */}
        <a href="/project">Project</a> {/* Consider changing these to <Link> as well */}
        <a href="/agent">Agent</a> {/* Consider changing these to <Link> as well */}
        <Link to="/AboutUs">About Us</Link>
      </nav>
      <div className="login-button">
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </header>
  );
}

export default Header;
