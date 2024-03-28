import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManagerBuildings = () => {
  const [managersData, setManagersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State mới cho dữ liệu đã lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State cho giá trị tìm kiếm

  useEffect(() => {
    const fetchManagersData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7137/api/Buildings/GetListBuildingDetails"
        );
        setManagersData(response.data);
        setFilteredData(response.data); // Đặt dữ liệu lọc ban đầu bằng toàn bộ dữ liệu
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchManagersData();
  }, []);
  const deleteBuilding = async (buildingId) => {
    // Optional: confirm before delete
    if (!window.confirm("Are you sure you want to delete this building?")) {
      return;
    }

    try {
      await axios.delete(`https://localhost:7137/api/Buildings/${buildingId}`);
      // If delete was successful, filter out the deleted building
      const newFilteredData = filteredData.filter(
        (manager) => manager.buildingId !== buildingId
      );
      setFilteredData(newFilteredData);
      // Provide feedback to the user
      alert("Building successfully deleted.");
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error("Error deleting building:", error);
      // Provide error feedback to the user
      alert("Failed to delete the building. Please try again later.");
    }
  };

  useEffect(() => {
    const filtered = managersData.filter((manager) =>
      manager.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, managersData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen font-serif">
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Managers</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 mr-4 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back
          </button>
          <input
            type="text"
            placeholder="Search here..."
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange} // Make sure to apply the change handler
          />
          <Link
            to="/createnewproject"
            className="ml-4 inline-flex items-center justify-center py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            New Building
          </Link>
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                  Building Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                  Number floor
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                  Number apartments
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                  View
                </th>

                {/* <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                  Actions
                </th> */}
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
                    <Link
                      to={`/property/${manager.buildingId}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      View
                    </Link>
                  </td>
                  {/* <td className="py-4 px-4">
                  <Link to={`/realestate/${manager.buildingId}`} className="text-blue-500 hover:text-blue-600">View</Link>
                </td> */}
                  {/* <td className="py-4 px-4 flex items-center space-x-3">
                    <Link
                      to={`/editbuilding/${manager.buildingId}`}
                      className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded focus:outline-none"
                    >
                      Edit
                    </Link>
                  </td> */}
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
