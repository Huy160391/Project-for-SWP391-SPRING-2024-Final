import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './DashboardInvestor.css'; // Make sure to create a CSS file for styling
import Sidebar from './Sidebar';
const ManagerTransaction = () => {
  // This is dummy data, you would replace this with data from your backend
  const managersData = [
    { customerName: 'Karen Hope', id: '#123456789', createDate: 'March 25, 2021', Detail: 'view', Acency: 'Customer', status :'acp'  },
    // ... more managers
  ];

  return (
    <div className="investor-dashboard">
    <Sidebar /> {/* Here we include the Sidebar component */}
    <div className="managers-container">
      <h1>managers</h1>
      <div className="managers-search">
        <input type="text" placeholder="Search here..." />
        <Link to="/distributefloor" className="add-user-button">
        Distribute for Acency
      </Link>
      <Link to="/distributeapartment" className="add-user-button">
        Distribute for Acency
      </Link>
      </div>
      <div className="managers-list">
        <table>
          <thead>
            <tr>
              <th>Agency</th>
              <th>AgencyId</th>
              <th>Total Floor</th>
              <th>Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managersData.map((managers, index) => (
              <tr key={index}>
                <td>{managers.customerName}</td>
                <td>{managers.profile}</td>
                <td>{managers.role}</td>
                <td>{managers.status}</td>
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

export default ManagerTransaction;
