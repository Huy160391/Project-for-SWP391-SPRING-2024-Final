import axios from "axios";
import emailjs from 'emailjs-com';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const ManageApartmentOfInvestor = () => {
  const [apartments, setApartments] = useState([]);
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);

  const [apartmentId, setApartmentId] = useState();

  useEffect(() => {
    fetchApartments();
    fetchAgencies();
  }, []);

  useEffect(() => {
    // Khởi tạo EmailJS SDK khi component được render
    emailjs.init("956l2dvoKTREeJJiQ");
  }, []);



  const sendEmail = (email, status) => {
    if (email) {
      emailjs
        .send("Aptx4869", "template_9h8jz5a77", {
          apartmentId: apartmentId,
          status: status,
          email: email,
        })
        .then((response) => {
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });
    } else {
      console.error("Recipient address is empty");
    }
  };


  const fetchApartments = async () => {

    try {


      const response = await axios.get("https://localhost:7137/api/Apartments/GetWaitingApartments");
      setApartments(response.data);

      const apartmentsResponse = await axios.get(
        "https://localhost:7137/api/Apartments/GetWaitingApartments"
      );
      const apartmentsWithRoomNumbers = await Promise.all(
        apartmentsResponse.data.map(async (apartment) => {
          const roomNumberResponse = await axios.get(
            `https://localhost:7137/api/Apartments/GetRoomNumberByApartmentId/${apartment.apartmentId}`
          );
          return { ...apartment, roomNumber: roomNumberResponse.data };
        })
      );
      setApartments(apartmentsWithRoomNumbers);

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
      console.error(`Failed to change apartment status for ${apartmentId}:`, error);
    }
  };




  const handleAccept = async (apartmentId, agencyId) => {
    const agency = agencies.find((agency) => agency.agencyId === agencyId);

    const isConfirmed = window.confirm(
      "Are you sure you want to accept this apartment update?"
    );
    if (isConfirmed && agencyId) {
      setApartmentId(apartmentId);

      await changeApartmentStatus(apartmentId, "Updated");

      sendEmail(agency.phone, "xác nhận");
      //window.location.reload(); // Reload the page to reflect the changes
      const updatedApartments = apartments.filter(apartment => apartment.apartmentId !== apartmentId);
      setApartments(updatedApartments);

    }
  };

  const handleReject = async (apartmentId, agencyId) => {
    const agency = agencies.find((agency) => agency.agencyId === agencyId);
    const isConfirmed = window.confirm(
      "Are you sure you want to reject this apartment update?"
    );

    if (isConfirmed && agencyId) {
      setApartmentId(apartmentId);

      await changeApartmentStatus(apartmentId, "Distributed");

      sendEmail(agency.phone, "từ chối");
      // window.location.reload(); // Reload the page to reflect the changes
      const updatedApartments = apartments.filter(apartment => apartment.apartmentId !== apartmentId);
      setApartments(updatedApartments);
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
    <div className="flex flex-col min-h-screen bg-gray-50 font-serif">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Apartment
        </h1>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back
          </button>
          <input
            type="text"
            placeholder="Search here..."
            className="flex-grow ml-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="border-b">
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
                  <td className="px-5 py-4">
                    {getAgencyFullName(apartment.agencyId)}
                  </td>
                  <td className="px-5 py-4">{apartment.roomNumber}</td>
                  <td className="px-5 py-4">
                    <img
                      src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`}
                      alt="Apartment"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-5 py-4">{apartment.status}</td>
                  <td className="px-5 py-4">
                  <Link to={`/reviewupdatedapartment/${apartment.apartmentId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">View</Link>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleAccept(apartment.apartmentId, apartment.agencyId)}
                      className="mr-2 px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(apartment.apartmentId, apartment.agencyId)}
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
        <div className="pagination flex justify-center space-x-2 mt-6">
          {/* Example pagination - adjust as necessary */}
          <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
            1
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageApartmentOfInvestor;