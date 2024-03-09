import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AddAgency.css';
import Sidebar from './Sidebar';

const AddNewAgency = () => {
  // Bước 1: Khởi tạo state từ localStorage
  const initialState = JSON.parse(localStorage.getItem('user')) || {
    firstName: '',
    lastName: '',
    username: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Bước 2: Lưu trữ dữ liệu vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append('FirstName', user.firstName);
    formData.append('LastName', user.lastName);
    formData.append('Username', user.username);
    formData.append('Address', user.address);
    formData.append('Phone', user.phoneNumber);
    formData.append('Password', user.password);

    try {
      const response = await axios.post('https://localhost:7137/api/Agencies/PostAgencyWithNoImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess('Agency added successfully!');
        // Reset form và localStorage sau khi submit thành công nếu bạn muốn
        // setUser({
        //   firstName: '',
        //   lastName: '',
        //   username: '',
        //   address: '',
        //   phoneNumber: '',
        //   password: '',
        //   confirmPassword: '',
        // });
        // localStorage.removeItem('user');
      } else {
        setError('Failed to add agency.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during submission.');
    }
  };

  return (
    <div className="investor-dashboard">
      <Sidebar />
      <div className="add-user-form">
        <h2>Add New Agency</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="avatar-container">
            <div className="avatar" />
            <button type="button">+ New Avatar</button>
          </div>
          <div className="form-fields">
            <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel">Cancel</button>
            <button type="submit" className="save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAgency;
