import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
  });
  const navigate = useNavigate();

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

    const dataToSend = new FormData();
    dataToSend.append('FirstName', formData.firstName);
    dataToSend.append('LastName', formData.lastName);
    dataToSend.append('Gender', formData.gender);
    dataToSend.append('Username', formData.username);
    dataToSend.append('Password', formData.password);
    dataToSend.append('Address', formData.address);
    dataToSend.append('Phone', formData.phone);

    try {
      const response = await axios.post('https://localhost:7137/api/Users/registerNoImage', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the API responds with some data on successful registration
      console.log(response.data);
      // Possibly redirect user or clear form, or show a success message
      navigate('/investordashboard');
      alert('Registration successful!');
      // Optionally reset form here
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        username: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
      });
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      // Display error message to user
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Đăng Ký</h1>
        <div className="form-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
        </div>
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
          <label>Confirm Password</label>
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
          Đã có tài khoản? <Link to="/">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;