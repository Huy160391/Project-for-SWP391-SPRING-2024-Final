import React from 'react';
import './AdminPage.css'; // Main CSS file for Admin layout
import Header from './Header';
import Pagination from './Pagination';
import ProjectList from './ProjectList';
import Sidebar from './Sidebar';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Header />
        <ProjectList />
        <Pagination />
      </div>
    </div>
  );
};

export default AdminPage;
