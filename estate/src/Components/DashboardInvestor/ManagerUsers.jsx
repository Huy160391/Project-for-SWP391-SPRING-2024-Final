import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
          manager.roleId.toLowerCase().includes(searchQuery.toLowerCase())&&
          manager.roleId !== "Investor"
      )
      : managersData.filter(manager => manager.roleId !== "Investor");
    const handleBack = () => {
      window.history.back();
    };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading managers: {error}</p>;

  return (
    <div className="flex min-h-screen">
    <div className="flex-1 p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
        >
          Back
        </button>
        <input
          type="text"
          placeholder="Search by username or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 text-gray-700 bg-white border border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
        />
        <Link
          to="/addnewagency"
          className="ml-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
           New Agency
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((manager, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">{manager.username}</td>
                <td className="px-6 py-4">{manager.password}</td>
                <td className="px-6 py-4">{manager.createDate}</td>
                <td className="px-6 py-4">{manager.status}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/profile/${manager.userId}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </Link>
                </td>
                <td className="px-6 py-4">{manager.roleId}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleBlockToggle(manager.userId)}
                    className={`px-4 py-2 text-white rounded ${manager.status === "Active" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                  >
                    {manager.status === "Active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button className="mx-1 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">1</button>
        <button className="mx-1 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">2</button>
        <button className="mx-1 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">3</button>
      </div>
    </div>
  </div>
  
  );
};

export default ManagerUsers;
