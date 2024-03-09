import React, { useState } from 'react';
import './DashboardInvestor.css'; // Ensure you have the corresponding CSS file

const AddNewUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // including validation and sending data to a backend server
    console.log(formData);
  };

  return (
    <div className="add-user-container">
      <aside className="sidebar">
        {/* Sidebar links would go here */}
      </aside>
      <main className="form-content">
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Repeat the structure above for email, address, etc. */}
          <div className="avatar-upload">
            <label htmlFor="avatar-upload">New Avatar</label>
            <input type="file" id="avatar-upload" />
            {/* Add image upload logic */}
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewUser;
