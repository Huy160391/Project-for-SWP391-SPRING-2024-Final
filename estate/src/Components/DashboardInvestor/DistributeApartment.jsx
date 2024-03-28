import axios from "axios";
import emailjs from "emailjs-com";
import React, { useEffect, useState } from "react";

const DistributeApartment = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [buildings, setBuildings] = useState([]); // State to hold buildings
  const [buildingId, setBuildingId] = useState(""); // Updated to hold the selected building ID
  const [floors, setFloors] = useState("");
  const [selectFloorId, setSelectFloorId] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [price, setPrice] = useState(""); // New state for holding the pric
  const [selectedAgency, setSelectedAgency] = useState();
  const [apartments, setApartments] = useState([]); // State to hold apartments
  const [selectedApartmentId, setSelectedApartmentId] = useState(""); // State to hold the selected apartment ID
  const [priceError, setPriceError] = useState("");
  const [selectedAgencyEmail, setSelectedAgencyEmail] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("https://localhost:7137/api/Projects");
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    // Khởi tạo EmailJS SDK khi component được render
    emailjs.init("EMFqDgk_XqGNuAryz");
  }, []);

  const sendEmail = () => {
    emailjs
      .send("Aptx4869", "template_1vtwxih", {
        email: selectedAgencyEmail,
        apartment: selectedApartmentId,
        numberFloor: selectFloorId,
        buidingName: buildingId,
        projectName: selectedProjectId,
      })
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  useEffect(() => {
    const fetchAgencyEmail = async () => {
      try {
        const { data } = await axios.get(
          `https://localhost:7137/api/Agencies/${selectedAgency}`
        );
        setSelectedAgencyEmail(data.phone);
      } catch (error) {
        console.error("Error fetching agency email:", error);
      }
    };
    fetchAgencyEmail();
  }, [selectedAgency]);

  useEffect(() => {
    const fetchBuildingsForProject = async (projectId) => {
      if (!projectId) {
        setBuildings([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `https://localhost:7137/api/Buildings/GetProjectBuildingDetails`
        );
        const buildingData = data.filter(
          (d) => d.projectId === selectedProjectId
        );
        setBuildings(buildingData);
      } catch (error) {
        console.error("Error fetching buildings for project:", error);
        setBuildings([]);
      }
    };

    fetchBuildingsForProject(selectedProjectId);
  }, [selectedProjectId]);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const { data } = await axios.get("https://localhost:7137/api/Agencies");
        // const dat = data.filter(
        //   (user) => user.roleId === "Agency"
        // );
        setRecipients(data);
      } catch (error) {
        console.error("Error fetching recipients:", error);
      }
    };
    fetchRecipients();
  }, []);

  useEffect(() => {
    const fetchFloor = async () => {
      try {
        const { data } = await axios.get(
          "https://localhost:7137/api/Buildings"
        );
        const floorData = data.filter((d) => d.buildingId === buildingId);
        setFloors(floorData);
      } catch (error) {
        console.error("Error fetching buildings for project:", error);
        setFloors([]);
      }
    };
    fetchFloor();
  }, [buildingId]);
  useEffect(() => {
    const fetchApartments = async () => {
      if (!buildingId || !selectFloorId) {
        setApartments([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `https://localhost:7137/api/Apartments/GetApartmentsByBuildingID?buildingId=${encodeURIComponent(
            buildingId
          )}`
        );
        // Bổ sung bước lọc để chỉ lấy các căn hộ chưa được "Distributed"
        const filteredApartments = data
          .filter(
            (apartment) => apartment.floorNumber.toString() === selectFloorId
          )
          .filter((apartment) => apartment.status !== "Distributed");
        setApartments(filteredApartments);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setApartments([]);
      }
    };

    fetchApartments();
  }, [buildingId, selectFloorId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Định nghĩa dữ liệu để gửi
    const distributionData = {
      buildingId: buildingId,
      agencyId: selectedAgency,
      apartmentId: selectedApartmentId,
      price: price, // Include the price in your distribution data
    };

    try {
      // Gọi API để submit dữ liệu
      const { buildingId, agencyId, apartmentId, price } = distributionData;
      const url = `https://localhost:7137/api/Buildings/DistributeApartment?buildingId=${encodeURIComponent(
        buildingId
      )}&agencyId=${encodeURIComponent(
        agencyId
      )}&apartmentId=${encodeURIComponent(
        apartmentId
      )}&price=${encodeURIComponent(price)}`;

      const response = await axios.post(url);
      // Xử lý khi gửi thành công
      sendEmail();
      console.log("Distribution success:", response.data);
      alert("Distribution successful!");

      // Có thể reset form hoặc làm gì đó sau khi submit thành công
    } catch (error) {
      // Xử lý khi có lỗi
      console.error("Error distributing project:", error);
      alert("Error in distribution.");
    }
  };
  const handlePriceChange = (e) => {
    const priceValue = e.target.value;
    setPrice(priceValue);
    if (priceValue < 5000 && priceValue !== "") {
      setPriceError("Price must be at least 5000.");
    } else {
      setPriceError(""); // Clear the error message when the price is valid
    }
  };
  const handleBack = () => {
    window.history.back();
  };
  const handleCancel = () => {
    setSelectedProjectId("");
    setBuildingId("");
    setFloors("");
    setSelectFloorId("");
    setSelectedAgency(undefined); // Hoặc bất kỳ giá trị mặc định ban đầu nào bạn muốn
    setPrice("");
    setSelectedApartmentId("");
    setSelectedAgencyEmail(undefined);
    setPriceError("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-serif">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Distribute Project
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="project-name" className="block text-gray-700">
              Project Name
            </label>
            <select
              id="project-name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setSelectFloorId("0");
                setSelectedAgency("Select Recipient");
              }}
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="building" className="block text-gray-700">
              Building
            </label>
            <select
              id="building"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={buildingId}
              onChange={(e) => {
                setBuildingId(e.target.value);
              }}
            >
              <option value="">Select Building</option>
              {buildings.map((building) => (
                <option key={building.buildingId} value={building.buildingId}>
                  {building.buildingName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="floors" className="block text-gray-700">
              Floors
            </label>
            <select
              id="floor"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectFloorId}
              onChange={(e) => setSelectFloorId(e.target.value)}
            >
              <option value="0">Select Floor</option>
              {floors &&
                floors.map((floor, index) =>
                  Array.from({ length: floor.numberOfFloors }, (_, i) => (
                    <option
                      key={`${floor.buildingId}-${index}-${i}`}
                      value={i + 1}
                    >
                      Floor {i + 1}
                    </option>
                  ))
                )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="apartment" className="block text-gray-700">
              Apartment
            </label>
            <select
              id="apartment"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedApartmentId}
              onChange={(e) => setSelectedApartmentId(e.target.value)}
            >
              <option value="">Select Apartment</option>
              {apartments.map((apartment) => (
                <option
                  key={apartment.apartmentId}
                  value={apartment.apartmentId}
                >
                  {`Apartment: ${
                    typeof apartment.apartmentId === "string" &&
                    apartment.apartmentId.includes(":")
                      ? apartment.apartmentId.split(":").pop()
                      : apartment.apartmentId
                  }`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              className={`w-full mt-1 p-2 border ${
                priceError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              value={price}
              onChange={handlePriceChange}
              placeholder="Enter price"
            />
            {priceError && (
              <p className="text-red-500 text-xs mt-1">{priceError}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="recipient" className="block text-gray-700">
              Agency
            </label>
            <select
              id="recipient"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
            >
              <option value="Select Recipient">Select Recipient</option>
              {recipients.map((recipient) => (
                <option key={recipient.agencyId} value={recipient.agencyId}>
                  {`${recipient.firstName} ${recipient.lastName}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            >
              Back
            </button>
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributeApartment;
