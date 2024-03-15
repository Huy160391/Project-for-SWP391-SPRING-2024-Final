import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardInvestor.css';

const ListDistributeAgency = () => {
  const [managersData, setManagersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Giá trị tìm kiếm cho cả username và role

  useEffect(() => {
    const fetchManagersData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://localhost:7137/api/Users');
        setManagersData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.toString());
      }
    };

    fetchManagersData();
  }, []);

  const filteredData = searchQuery
    ? managersData.filter(
        manager =>
          manager.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manager.roleId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : managersData;

  return (
    <div className="investor-dashboard">
      <div className="managers-container">
        <h1>Managers</h1>
        <div className="managers-search">
          <input
            type="text"
            placeholder="Search by username or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

        </div>
        <div className="managers-list">
          <table>
            <thead>
              <tr>
                <th>Builings</th>
                <th>Apartments</th>
                <th>Create Date</th>
                <th>Status</th>
                <th>Detail</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((manager, index) => (
                <tr key={index}>
                  <td>{manager.username}</td>
                  <td>{manager.password}</td>
                  <td>{manager.createDate}</td>
                  <td>{manager.status}</td>
                  <td>
                    <Link to={`/agencydetail/${manager.userId}`} className="view-profile-button">View</Link>
                  </td>
                  <td>{manager.roleId}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
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

export default ListDistributeAgency;
