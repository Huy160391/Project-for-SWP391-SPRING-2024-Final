import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewHistoryOrder = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [sortedOrders, setSortedOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  const fetchOrders = async () => {
    try {
      const orderRes = await axios.get(`https://localhost:7137/api/Orders`);
      const filteredOrders = orderRes.data.filter(
        (order) => order.status === "Complete"
      );
      const fetchedOrders = await Promise.all(
        filteredOrders.map(async (order) => {
          const buildingRes = await axios.get(
            `https://localhost:7137/api/Apartments/GetListBuildingIdByApartmentId/${order.apartmentId}`
          );
          const buildingId = buildingRes.data[0];
          const buildingDetails = await axios.get(
            `https://localhost:7137/api/Buildings/${buildingId}`
          );
          const agencyRes = await axios.get(
            `https://localhost:7137/api/Agencies/${order.agencyId}`
          );
          const agency = agencyRes.data;
          const RemainingAmountRes = await axios.get(
            `https://localhost:7137/api/Orders/GetRemainingAmount/${order.orderId}`
          );
          const RemainingAmount = RemainingAmountRes.data;
          const customerResponse = await axios.get(
            `https://localhost:7137/api/Customers/${order.customerId}`
          );
          const customer = customerResponse.data;
          const apartmentResponse = await axios.get(
            `https://localhost:7137/api/Apartments/${order.apartmentId}`
          );
          const apartment = apartmentResponse.data;
          const apartmentNameResponse = await axios.get(
            `https://localhost:7137/api/Apartments/GetRoomNumberByApartmentId/${order.apartmentId}`
          );
          const apartmentName = apartmentNameResponse.data;
          return {
            ...order,
            buildingName: buildingDetails.data.name,
            buildingAddress: buildingDetails.data.address,
            apartmentName,
            apartmentNumberOfBedrooms: apartment.numberOfBedrooms,
            apartmentNumberOfBathrooms: apartment.numberOfBathrooms,
            apartmentArea: apartment.area,
            apartmentFloorNumber: apartment.floorNumber,
            apartmentPrice: apartment.price,
            agencyName: `${agency.firstName} ${agency.lastName}`,
            agencyAddress: agency.address,
            agencyPhone: agency.phone,
            customerName: `${customer.firstName} ${customer.lastName}`,
            customerAddress: customer.address,
            customerPhone: customer.phone,
            RemainingAmount,
          };
        })
      );
      const sortedOrders = fetchedOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setSortedOrders(sortedOrders);
      setAllOrders(sortedOrders);
      setOrders(sortedOrders.slice(0, ordersPerPage));
      const buildingNames = [
        ...new Set(sortedOrders.map((order) => order.buildingName)),
      ];
      setBuildings(buildingNames);
      const agencyNames = [
        ...new Set(sortedOrders.map((order) => order.agencyName)),
      ];
      setAgencies(agencyNames);
      const customerNames = [
        ...new Set(sortedOrders.map((order) => order.customerName)),
      ];
      setCustomers(customerNames);
      setOriginalOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError(
        "Failed to fetch orders. Please check the console for more details."
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleAgencyChange = (event) => {
    setSelectedAgency(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleSearch = () => {
    const originalOrdersCopy = [...originalOrders];

    let filteredOrders = originalOrdersCopy.slice();

    if (selectedBuilding) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.buildingName.toLowerCase() === selectedBuilding.toLowerCase()
      );
    }

    if (selectedAgency) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.agencyName.toLowerCase() === selectedAgency.toLowerCase()
      );
    }

    if (selectedCustomer) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.customerName.toLowerCase() === selectedCustomer.toLowerCase()
      );
    }

    setAllOrders(filteredOrders);

    if (!selectedBuilding && !selectedAgency && !selectedCustomer) {
      setOrders(originalOrdersCopy.slice(0, ordersPerPage));
    } else {
      setOrders(filteredOrders.slice(0, ordersPerPage));
    }

    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allOrders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(allOrders.length / ordersPerPage))
    );
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const currentOrders = allOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Order History</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Building Name</th>
              <th className="px-4 py-2">Apartment Name</th>
              <th className="px-4 py-2">Agency Name</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">{order.buildingName}</td>
                <td className="px-4 py-2">{order.apartmentName}</td>
                <td className="px-4 py-2">{order.agencyName}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">${order.apartmentPrice}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/view-order-bill-of-customer/${order.orderId}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Bill
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="bg-white p-5 rounded-lg shadow-lg flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[80vh] max-w-[80vw]"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-0 right-0 mt-4 mr-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Pagination and other logic remains unchanged */}
    </div>
  );
};

export default ViewHistoryOrder;
