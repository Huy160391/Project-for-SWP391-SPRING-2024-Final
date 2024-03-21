import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageApartmentOfInvestor = () => {
  const [apartments, setApartments] = useState([]);
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7137/api/Apartments/GetWaitingApartments"
      );
      setApartments(response.data);
    } catch (error) {
      console.error("Failed to fetch apartments:", error);
    }
  };

  const changeApartmentStatus = async (apartmentId, newStatus) => {
    try {
      const encodedApartmentId = encodeURIComponent(apartmentId);
      await axios.put(
        `https://localhost:7137/api/Apartments/ChangeApartmentStatus/${encodedApartmentId}?newStatus=${newStatus}`,
        {},
        {
          headers: { accept: "*/*" },
        }
      );
      fetchApartments(); // Refresh the list to reflect the status change
    } catch (error) {
      console.error(
        `Failed to change apartment status for ${apartmentId}:`,
        error
      );
    }
  };
  const handleAccept = async (apartmentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to accept this apartment update?"
    );
    if (isConfirmed) {
      await changeApartmentStatus(apartmentId, "Updated");
      window.location.reload(); // Reload the page to reflect the changes
    }
  };

  const handleReject = async (apartmentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reject this apartment update?"
    );
    if (isConfirmed) {
      await changeApartmentStatus(apartmentId, "Distributed");
      window.location.reload(); // Reload the page to reflect the changes
    }
  };
  const fetchAgencies = async () => {
    try {
      const response = await axios.get("https://localhost:7137/api/Agencies");
      setAgencies(response.data);
    } catch (error) {
      console.error("Failed to fetch agencies:", error);
    }
  };

  useEffect(() => {
    fetchApartments();
    fetchAgencies();
  }, []);
  const getAgencyFullName = (agencyId) => {
    const agency = agencies.find((agency) => agency.agencyId === agencyId);
    return agency ? `${agency.firstName} ${agency.lastName}` : "Unknown Agency";
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Manage Apartment
        </h1>
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
                  Apartment
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  View
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
                <tr key={apartment.apartmentId} className="border-b">
                  <td>{getAgencyFullName(apartment.agencyId)}</td>
                  <td>{apartment.apartmentId}</td>
                  <td>
                    <img
                      src={`https://localhost:7137/${apartment.apartmentType}`}
                      alt="Apartment"
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td>{apartment.status}</td>
                  <td></td>
                  <td>
                    <button
                      onClick={() => handleAccept(apartment.apartmentId)}
                      className="mr-2 px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(apartment.apartmentId)}
                      className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Placeholder */}
        <div className="pagination flex justify-center space-x-2 mt-6">
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
            1
          </button>
          {/* Implement actual pagination logic */}
        </div>
      </div>
    </div>
  );
};

export default ManageApartmentOfInvestor;
