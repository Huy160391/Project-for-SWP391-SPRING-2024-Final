import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DashboardInvestor.css";
import Sidebar from "./Sidebar";

const ManagerUsers = () => {
  const [managersData, setManagersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBlock, setBlock] = useState(false);

  let action;

  useEffect(() => {
    const fetchManagersData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://localhost:7137/api/Users");
        setManagersData(
          response.data.map((user) => ({
            ...user,
          }))
        ); // Add isBlocking state to each user
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.toString());
      }
    };

    fetchManagersData();
  }, []);

  const handleBlockToggle = async (userId) => {
    // const userToToggle = managersData.find((user) => user.userId === userId);
    // const isCurrentlyBlocking = userToToggle ? userToToggle.isBlocking : false;
    // console.log (isCurrentlyBlocking)

    //  isCurrentlyBlocking ? 'unblock' : 'block';

    setBlock(!isBlock);

    if (isBlock) {
      action = "Block";
    } else {
      action = "Unblock";
    }

    const confirmation = window.confirm(
      `Are you sure you want to ${action} this user?`
    );

    if (confirmation) {
      try {
        await axios.put(`https://localhost:7137/api/Users/BlockUser/${userId}`);
        setManagersData(
          managersData.map((user) =>
            user.userId === userId ? { ...user } : user
          )
        );
        // Optionally, you might want to display a success message before reloading
        window.location.reload();
      } catch (error) {
        console.error("Error updating user status:", error);
        setError("Error updating user status");
      }
    }
  };

  const filteredData = searchQuery
    ? managersData.filter(
        (manager) =>
          manager.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manager.roleId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : managersData;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading managers: {error}</p>;

  return (
    <div className="investor-dashboard">
      <Sidebar />
      <div className="managers-container">
        <h1>Managers</h1>
        <div className="managers-search">
          <input
            type="text"
            placeholder="Search by username or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to="/addnewagency" className="add-user-button">
            + New User
          </Link>
        </div>
        <div className="managers-list">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Create Date</th>
                <th>Status</th>
                <th>Profile</th>
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
                    <Link
                      to={`/profile/${manager.userId}`}
                      className="view-profile-button"
                    >
                      View
                    </Link>
                  </td>
                  <td>{manager.roleId}</td>
                  <td>
                    <button onClick={() => handleBlockToggle(manager.userId)}>
                      {/* {manager.isBlocking ? "Unblock" : "Block"} */}
                      {manager.status === "Active" ? "Unblock" : manager.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </div>
      </div>
    </div>
  );
};

export default ManagerUsers;
