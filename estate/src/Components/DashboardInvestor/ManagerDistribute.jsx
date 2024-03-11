import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './DashboardInvestor.css'; // Make sure to create a CSS file for styling
import Sidebar from './Sidebar';
const ManagerDistribute = () => {
  // This is dummy data, you would replace this with data from your backend
  const managersData = [
    { customerName: 'Karen Hope', id: '#123456789', createDate: 'March 25, 2021', Detail: 'view', Acency: 'Customer', status :'acp'  },
    // ... more managers
  ];

  return (
    <div className="flex min-h-screen">
  <Sidebar /> {/* Giả sử Sidebar đã được style */}
<div className="flex-1 p-6 bg-gray-50">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Managers</h1>
    <div className="flex justify-between mb-6">
      <input
        type="text"
        placeholder="Search here..."
        className="flex-grow mr-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Link
        to="/distributefloor"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Distribute for Agency
      </Link>
      </div>
    <div className="mt-6 overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="border-b">
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Agency</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">AgencyId</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Floor</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Detail</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {managersData.map((manager, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-5 py-5">{manager.customerName}</td>
              <td className="px-5 py-5">{manager.profile}</td>
              <td className="px-5 py-5">{manager.role}</td>
              <td className="px-5 py-5">{manager.status}</td>
              <td className="px-5 py-5 flex space-x-2">
                <button className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded focus:outline-none">Edit</button>
                <button className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white font-bold rounded focus:outline-none">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="pagination flex justify-center space-x-2 mt-6">
      <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">1</button>
      <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">2</button>
      <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">3</button>
    </div>
  </div>
</div>

  );
};

export default ManagerDistribute;
