import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardInvestor.css';
import Sidebar from './Sidebar';

const ManagerUsers = () => {
  const [managersData, setManagersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagersData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://localhost:7137/api/Customers'); // Replace with your API endpoint
        setManagersData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.toString());
      }
    };

    fetchManagersData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading managers: {error}</p>;

  return (
    <div className="investor-dashboard">
    <Sidebar /> {/* Here we include the Sidebar component */}
    <div className="managers-container">
      <h1>managers</h1>
      <div className="managers-search">
        <input type="text" placeholder="Search here..." />
        <select>
          <option value="newest">Newest</option>
          {/* Other sort options */}
        </select>
        <Link to="/addnewuser" className="add-user-button">
        + New User
      </Link>
      </div>
      <div className="managers-list">
        <table>
          <thead>
            <tr>
              <th>Fullname</th>
              <th>ID</th>
              <th>Create Date</th>
              <th>Profile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {managersData.map((managers, index) => {
    const fullName = `${managers.firstName} ${managers.lastName}`;
    return (
      <tr key={index}>
                <td>{fullName}</td>
                <td>{managers.id}</td>
                <td>{managers.createDate}</td>
                <td>{managers.profile}</td>
                <td>{managers.role}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
             );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {/* Pagination logic will go here */}
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
    </div>
  );
  
};

export default ManagerUsers;
