import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardInvestor.css';
import Sidebar from './Sidebar';

const ManagerBuildings = () => {
  const [managersData, setManagersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State mới cho dữ liệu đã lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State cho giá trị tìm kiếm

  useEffect(() => {
    const fetchManagersData = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Buildings/GetListBuildingDetails');
        setManagersData(response.data);
        setFilteredData(response.data); // Đặt dữ liệu lọc ban đầu bằng toàn bộ dữ liệu
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchManagersData();
  }, []);

  useEffect(() => {
    // Cập nhật dữ liệu lọc dựa trên giá trị tìm kiếm
    const filtered = managersData.filter(manager =>
      manager.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, managersData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="investor-dashboard">
      <Sidebar /> {/* Here we include the Sidebar component */}
      <div className="managers-container">
        <h1>Buildings</h1>
        <div className="managers-search">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select>
            <option value="newest">Newest</option>
            {/* Other sort options */}
          </select>
          <Link to="/createnewproject" className="add-user-button">
            New Project
          </Link>
        </div>
        <div className="managers-list">
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Building Name</th>
                <th>Number apartments</th>
                <th>Number floor</th>
                <th>Detail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((manager, index) => (
                <tr key={index}>
                  <td>{manager.projectName}</td>
                  <td>{manager.buildingName}</td>
                  <td>{manager.numberOfFloors}</td>
                  <td>{manager.numberOfApartments}</td>
                  <td>
                      <Link to={`/realestate/${manager.buildingId}`} className="view-profile-button">View</Link>
                    </td>
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

export default ManagerBuildings;
