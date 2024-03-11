import axios from 'axios';
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AddNewAgency = () => {
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
  const [file, setFile] = useState(null); // State for the file
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the state to hold the selected file
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

    // Append the file to formData if it exists
    if (file) {
      formData.append('FileImage', file);
    }

    try {
      const response = await axios.post('https://localhost:7137/api/Agencies/PostAgencyWithImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess('Agency added successfully!');
        // Optional: Reset form and state
      } else {
        setError('Failed to add agency.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during submission.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
    <Sidebar /> {/* Giả định Sidebar đã được style sẵn */}
    <div className="flex-1 flex flex-col p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Agency</h2>
      {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
      {success && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-cover" style={{backgroundImage: `url(${user.avatarUrl || 'default_avatar.png'})`}}></div>
          </div>
          <input type="file" name="fileImage" onChange={handleFileChange} className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-50 file:text-gray-700
            hover:file:bg-gray-100
          "/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} className="p-2 border rounded shadow-sm" />
          <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} className="p-2 border rounded shadow-sm" />
          <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} className="p-2 border rounded shadow-sm" />
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="p-2 border rounded shadow-sm" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} className="p-2 border rounded shadow-sm" />
          <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} className="p-2 border rounded shadow-sm" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleChange} className="p-2 border rounded shadow-sm" />
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button type="button" className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded shadow">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow">Save</button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AddNewAgency;
