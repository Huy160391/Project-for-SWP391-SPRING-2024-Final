import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css'; // Make sure to create a CSS file with the name Registration.css

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure password and confirmPassword are the same
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await axios.post('https://your-api-endpoint/register', formData);
      // The response from the server will be in response.data
      console.log(response.da);
      // Handle success, e.g., redirect to login page or display a success message
    } catch (error) {
      console.error('Registration failed:', error.response || error.message);
      // Handle errors here, such as displaying a notification to the user
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Đăng Ký</h1>
        <div className="form-field">
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Enter username or email" 
            value={formData.username}
            onChange={handleChange} 
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter password" 
            value={formData.password}
            onChange={handleChange} 
          />
        </div>
        <div className="form-field">
          <label>Confirm password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm password" 
            value={formData.confirmPassword}
            onChange={handleChange} 
          />
        </div>
        <div className="form-field">
          <label>Address</label>
          <input 
            type="text" 
            name="address" 
            placeholder="Enter address" 
            value={formData.address}
            onChange={handleChange} 
          />
        </div>
        <div className="form-field">
          <label>Phone</label>
          <input 
            type="text" 
            name="phone" 
            placeholder="Enter phone number" 
            value={formData.phone}
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="register-button">ĐĂNG KÝ</button>
        <div className="signin-redirect">
  Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
</div>
      </form>
    </div>
  );
};

export default Registration;
