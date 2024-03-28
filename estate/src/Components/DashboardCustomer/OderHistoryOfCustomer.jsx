import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderHistoryOfCustomer = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [buildings, setBuildings] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [transactionCode, setTransactionCode] = useState("");
  const [userImage, setUserImage] = useState(null);

  const fetchOrders = async () => {
    if (!customerId) {
      setError("Customer ID is undefined or not provided.");
      return;
    }
    try {
      const orderRes = await axios.get(
        `https://localhost:7137/api/Orders/GetAllOderByCustomerId/${customerId}`
      );
      const fetchedOrders = await Promise.all(
        orderRes.data.map(async (order) => {
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
          const agencyName = `${agencyRes.data.firstName} ${agencyRes.data.lastName}`;
          const RemainingAmountRes = await axios.get(
            `https://localhost:7137/api/Orders/GetRemainingAmount/${order.orderId}`
          );
          const RemainingAmount = RemainingAmountRes.data;
          const apartmentNameRes = await axios.get(
            `https://localhost:7137/api/Apartments/GetRoomNumberByApartmentId/${order.apartmentId}`
          );
          const apartmentName = apartmentNameRes.data;
          return {
            ...order,
            buildingName: buildingDetails.data.name,
            buildingAddress: buildingDetails.data.address,
            agencyName,
            RemainingAmount,
            apartmentName,
          };
        })
      );
      setAllOrders(fetchedOrders);
      setOrders(fetchedOrders.slice(0, ordersPerPage));

      const buildingNames = [
        ...new Set(fetchedOrders.map((order) => order.buildingName)),
      ];
      setBuildings(buildingNames);

      const agencyNames = [
        ...new Set(fetchedOrders.map((order) => order.agencyName)),
      ];
      setAgencies(agencyNames);

      const orderStatuses = [
        ...new Set(fetchedOrders.map((order) => order.status)),
      ];
      setStatuses(orderStatuses);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError(
        "Failed to fetch orders. Please check the console for more details."
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [customerId, ordersPerPage]);

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleAgencyChange = (event) => {
    setSelectedAgency(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearch = () => {
    let filtered = allOrders;
    if (selectedBuilding) {
      filtered = filtered.filter(
        (order) => order.buildingName === selectedBuilding
      );
    }
    if (selectedAgency) {
      filtered = filtered.filter(
        (order) => order.agencyName === selectedAgency
      );
    }
    if (selectedStatus) {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }
    setOrders(filtered.slice(0, ordersPerPage));
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastOrder = pageNumber * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    setOrders(allOrders.slice(indexOfFirstOrder, indexOfLastOrder));
  };

  // Calculate page count
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allOrders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle change in transaction code input
  const handleTransactionCodeChange = (event) => {
    setTransactionCode(event.target.value);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    setUserImage(event.target.files[0]);
  };

  // Handle confirmation of booking
  const handleConfirmBooking = async (event, orderId) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      if (userImage) {
        formData.append("FileImage", userImage);
      }

      const response = await axios.post(
        `https://localhost:7137/api/Orders/UploadImageOrder/${orderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (window.confirm(`Do you want to Confirm Order?`)) {
        await axios.put(
          `https://localhost:7137/api/Orders/ChangeOrderStatus/${orderId}/Waiting`
        );
        alert("Confirm Order Success");

        fetchOrders();
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  // Render message if there are no orders
  if (allOrders.length === 0) {
    return (
      <div className="text-center font-bold">Bạn chưa có order nào</div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="mt-5 ml-5 flex justify-start items-center space-x-10">
        <h1 className="text-4xl font-bold text-indigo-600  px-4 py-2 bg-white rounded-lg">
          View Your Order
        </h1>
      </div>
      <div className="mt-5 ml-5 mb-6 flex justify-start items-center space-x-10">
        <div>
          <label
            htmlFor="building-select"
            className="block text-sm font-medium text-gray-700"
          >
            Building Name:
          </label>
          <select
            id="building-select"
            value={selectedBuilding}
            onChange={handleBuildingChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow"
          >
            <option value="">All</option>
            {buildings.map((building, index) => (
              <option key={index} value={building}>
                {building}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="agency-select"
            className="block text-sm font-medium text-gray-700"
          >
            Agency Name:
          </label>
          <select
            id="agency-select"
            value={selectedAgency}
            onChange={handleAgencyChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow"
          >
            <option value="">All</option>
            {agencies.map((agency, index) => (
              <option key={index} value={agency}>
                {agency}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="status-select"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status-select"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow"
          >
            <option value="">All</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="mt-4 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow"
        >
          Back
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Building Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apartment Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Building Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agency Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.buildingName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.apartmentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.buildingAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.totalAmount ?? "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.agencyName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8 mb-8">
        <nav aria-label="Page navigation" className="select-none">
          <ul className="inline-flex -space-x-px">
            {pageNumbers.map((number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 text-sm font-semibold leading-5 transition-colors duration-150 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue ${currentPage === number
                      ? "bg-blue-500 text-white border-blue-600"
                      : "text-blue-700 bg-white hover:bg-blue-100 hover:text-blue-700"
                    }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OrderHistoryOfCustomer;
