import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManagerDistribute = () => {
  const [managersData, setManagersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7137/api/Apartments/GetAllAgencyAndNumberOfApartment"
        );
        
        // Fetch agency details including phone numbers in parallel
        const agencyDetailsPromises = response.data.map((manager) =>
          axios.get(`https://localhost:7137/api/Agencies/${manager.agencyId}`)
        );
        const agencyDetailsResponses = await Promise.all(agencyDetailsPromises);
        
        const modifiedData = response.data.map((manager, index) => {
          const agencyDetails = agencyDetailsResponses[index].data;
          return {
            ...manager,
            agencyName: `${manager.agencyFirstName} ${manager.agencyLastName}`, // Concatenate first name and last name
            phone: agencyDetails.phone, // Add phone number from the agency details response
          };
        });
        
        setManagersData(modifiedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
}, []);
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Managers Distribute</h1>
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
          />
          <Link
            to="/distributefloor"
            className="ml-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Phân công tầng
          </Link>
          <Link
            to="/distributeapartment"
            className="ml-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Phân công phòng
          </Link>
        </div>
        <div className="mt-6 overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="border-b">
                {/* Update the column headers based on your actual data structure */}
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Agency
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  AgencyId
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Apartment
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {managersData.map((manager, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-5">{manager.agencyName}</td>
                  <td className="px-5 py-5">{manager.phone}</td>
                  <td className="px-5 py-5">{manager.numberOfApartments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination flex justify-center space-x-2 mt-6">
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
            1
          </button>
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
            2
          </button>
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
            3
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDistribute;
