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
    <div className="flex min-h-screen">
    <Sidebar /> {/* Assuming Sidebar is another component with its own styles */}
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Buildings</h1>
      <div className="mt-4 flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Search here..."
          className="block w-full mr-4 py-2 px-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select className="py-2 px-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option value="newest">Newest</option>
          {/* Other sort options */}
        </select>
        <Link to="/createnewproject" className="ml-4 inline-flex items-center justify-center py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2">
          New Project
        </Link>
      </div>
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Project Name</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Building Name</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Number apartments</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Number floor</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Detail</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredData.map((manager, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">{manager.projectName}</td>
                <td className="py-4 px-4">{manager.buildingName}</td>
                <td className="py-4 px-4">{manager.numberOfFloors}</td>
                <td className="py-4 px-4">{manager.numberOfApartments}</td>
                <td className="py-4 px-4">
                  <Link to={`/realestate/${manager.buildingId}`} className="text-blue-500 hover:text-blue-600">View</Link>
                </td>
                <td className="py-4 px-4 flex items-center space-x-3">
                  <button className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded focus:outline-none">Edit</button>
                  <button className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" disabled={isSubmitting}>Previous</button>
        <span>Page {currentPage}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" disabled={isSubmitting}>Next</button> */}
      </div>
    </div>
  </div>
  
  );
};

export default ManagerBuildings;
