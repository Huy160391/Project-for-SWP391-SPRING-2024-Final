import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OderHistoryOfCustomer = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [buildings, setBuildings] = useState([]);
  const [agencys, setAgencys] = useState([]);
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
      setError("Agency ID is undefined or not provided.");
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
      setAgencys(agencyNames);

      const orderstatus = [
        ...new Set(fetchedOrders.map((order) => order.status)),
      ];
      setStatuses(orderstatus);
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
  const handleTransactionCodeChange = (event) => {
    setTransactionCode(event.target.value);
  };
  const handleImageUpload = (event) => {
    setUserImage(event.target.files[0]);
  };

  const handleConfirmBooking = async (event, orderid) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      // Gửi dữ liệu hình ảnh
      if (userImage) {
        formData.append("FileImage", userImage); // Đặt tên tham số là 'FileImage'
      }

      const response = await axios.post(
        `https://localhost:7137/api/Orders/UploadImageOrder/${orderid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (window.confirm(`Do you want to Confirm Order?`)) {
        await axios.put(
          `https://localhost:7137/api/Orders/ChangeOrderStatus/${orderid}/Waiting`
        );
        alert("Confirm Order Success");

        fetchOrders();
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      // Xử lý lỗi ở đây
    }
  };
  if (allOrders.length === 0) {
    return (
      <div className="text-center font-bold">Bạn chưa có có order nào</div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <div className="mt-5 ml-5 flex justify-start items-center space-x-10">
        <h1 className="text-4xl font-bold text-indigo-600  px-4 py-2 bg-white rounded-lg">
          View Your Oder
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
            {agencys.map((agency, index) => (
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
      {orders.map((order, index) => (
        <div
          key={index}
          className="bg-white shadow overflow-hidden sm:rounded-lg mb-5"
        >
          <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white  rounded-lg">
            <div className="md:col-span-2 lg:col-span-3">
              <div className="text-lg font-semibold text-indigo-600">
                Order #{index + 1} Details
              </div>
            </div>{" "}
            {/* Enhanced header styling */}
            <div className="text-sm font-medium text-gray-700">
              <strong>Building Name:</strong>{" "}
              <span className="text-gray-600">{order.buildingName}</span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              <strong>Date:</strong>{" "}
              <span className="text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              <strong>Apartment Name:</strong>{" "}
              <span className="text-gray-600">{order.apartmentName}</span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              <strong>Building Address:</strong>{" "}
              <span className="text-gray-600">{order.buildingAddress}</span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              <strong>Status:</strong>{" "}
              <span className="text-gray-600">{order.status}</span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              <strong>Total Amount:</strong>{" "}
              <span className="text-gray-600">
                {order.totalAmount ?? "N/A"}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-700 lg:col-span-3">
              <strong>Agency Name:</strong>{" "}
              <span className="text-gray-600">{order.agencyName}</span>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6">
            {order.status === "Unpaid" && (
              <div>
                <h1 className="text-4xl font-bold text-red-600 px-4 py-2 w-44  bg-red-400 rounded-lg ml-20">
                  Unpaid
                </h1>
                <div className=" text-2xl font-medium text-gray-700 text-right mb-3 ">
                  <strong>Remaining Amount:</strong>{" "}
                  <span className="text-green-600 text-4xl">
                    ${order.RemainingAmount}
                  </span>
                </div>
                <div className="flex flex-col items-end bg-white p-2 rounded-md ">
                  <p className="text-lg text-gray-800 mb-4">
                    Scan QR code to pay
                  </p>
                  <div className="w-40 h-40 flex items-center justify-center border border-gray-300 rounded-md mb-4">
                    <img
                      src={`https://www.meme-arsenal.com/memes/3d983bc786e0fea7629d7ad884f3c417.jpg`}
                      alt="QR Code"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="mb-4 w-full flex flex-col items-end">
                    <label
                      htmlFor="transactionCode"
                      className="text-lg text-gray-800 block mb-2"
                    >
                      Transaction Code:
                    </label>
                    <input
                      type="text"
                      id="transactionCode"
                      value={transactionCode}
                      onChange={handleTransactionCodeChange}
                      className="w-72 shadow-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4 w-full flex flex-col items-end">
                    <label
                      htmlFor="paymentImage"
                      className="text-lg text-gray-800 block mb-2"
                    >
                      Upload Payment Image:
                    </label>
                    <input
                      type="file"
                      id="paymentImage"
                      onChange={handleImageUpload}
                      className="w-72 shadow-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {userImage && (
                      <div className="mt-2">
                        <img
                          src={
                            typeof userImage === "string"
                              ? userImage
                              : URL.createObjectURL(userImage)
                          }
                          alt="Uploaded"
                          className="w-full max-h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(event) =>
                      handleConfirmBooking(event, order.orderId)
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            )}
            {order.status === "Waiting" && (
              <h1 className="text-4xl font-bold text-gray-200 px-4 py-2 w-44 bg-gray-500 rounded-lg ml-20">
                Waiting
              </h1>
            )}

            {order.status === "Complete" && (
              <div>
                <h1 className="text-4xl font-bold text-green-200 px-2 py-2 w-44 bg-green-500 rounded-lg ml-20">
                  Complete
                </h1>
                <div className="px-4 py-4 sm:px-6 flex flex-col items-end">
                  <Link
                    to={`/view-order-bill-of-customer/${order.orderId}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    View Bill Information
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-8 mb-8">
        <nav aria-label="Page navigation" className="select-none">
          <ul className="inline-flex -space-x-px">
            {pageNumbers.map((number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 text-sm font-semibold leading-5 transition-colors duration-150 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue ${
                    currentPage === number
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

export default OderHistoryOfCustomer;
