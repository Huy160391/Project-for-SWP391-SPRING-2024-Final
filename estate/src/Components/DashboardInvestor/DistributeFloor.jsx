import axios from "axios";
import emailjs from 'emailjs-com';
import React, { useEffect, useState } from "react";

const DistributeFloor = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [buildings, setBuildings] = useState([]); // State to hold buildings
  const [buildingId, setBuildingId] = useState(""); // Updated to hold the selected building ID
  const [floors, setFloors] = useState("");
  const [selectFloorId, setSelectFloorId] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState();
  const [price, setPrice] = useState(""); // State for holding the price
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


  const handlePriceChange = (e) => {
    const priceValue = e.target.value;
    setPrice(priceValue);
    if (priceValue < 5000 && priceValue !== "") {
      setPriceError("Price must be at least 5000.");
    } else {
      setPriceError(""); // Clear the error message when the price is valid
    }
  };


  useEffect(() => {
    // Khởi tạo EmailJS SDK khi component được render
    emailjs.init("GRGyUXUQNJZWmAVmh");
  }, []);

  const sendEmail = () => {
    emailjs.send('Aptx4869', 'template_ygv43ov77', {
      email: selectedAgencyEmail,
      numberFloor: selectFloorId,
      buidingName: buildingId,
      projectName: selectedProjectId

    })
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  };

  console.log("data", buildingId, selectedProjectId, selectedAgencyEmail)

  useEffect(() => {
    const fetchAgencyEmail = async () => {
      try {
        const { data } = await axios.get(`https://localhost:7137/api/Agencies/${selectedAgency}`);
        setSelectedAgencyEmail(data.phone);
      } catch (error) {
        console.error("Error fetching agency email:", error);
      }
    };
    fetchAgencyEmail();
  }, [selectedAgency]);

  console.log("data", selectedAgencyEmail);

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
        setRecipients(data)
      } catch (error) {
        console.error("Error fetching recipients:", error);
      }
    };
    fetchRecipients();
  }, []);

  useEffect(() => {
    const fetchFloor = async () => {
      try {
        // Giả sử chi tiết tòa nhà bao gồm tổng số tầng
        const { data: buildingDetails } = await axios.get(
          `https://localhost:7137/api/Buildings/${encodeURIComponent(
            buildingId
          )}`
        );
        const totalFloors = buildingDetails.numberOfFloors; // Sử dụng trực tiếp từ API response

        // Fetch apartments to check for distributed floors
        const { data: apartmentsData } = await axios.get(
          `https://localhost:7137/api/Apartments/GetApartmentsByBuildingID?buildingId=${encodeURIComponent(
            buildingId
          )}`
        );

        // Determine which floors have been distributed
        const distributedFloors = apartmentsData
          .filter((apartment) => apartment.status === "Distributed")
          .map((apartment) => apartment.floorNumber);

        // Tạo danh sách tất cả các tầng
        let allFloors = Array.from({ length: totalFloors }, (_, i) => i + 1);

        // Loại bỏ các tầng đã phân phối để tìm tầng có sẵn
        let availableFloors = allFloors.filter(
          (floor) => !distributedFloors.includes(floor)
        );

        setFloors(availableFloors);
      } catch (error) {
        console.error("Error fetching floors or apartments:", error);
        setFloors([]);
      }
    };
    if (buildingId) {
      fetchFloor();
    }
  }, [buildingId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const distributionData = {
      buildingId: buildingId,
      floor: selectFloorId,
      agencyId: selectedAgency,
      price: price, // Include the price in your distribution data
    };




    try {
      const { buildingId, agencyId, floor, price } = distributionData;
      const url = `https://localhost:7137/api/Buildings/DistributeFloor?buildingId=${encodeURIComponent(
        buildingId
      )}&agencyId=${encodeURIComponent(agencyId)}&floor=${encodeURIComponent(
        floor
      )}&price=${encodeURIComponent(price)}`;

      const response = await axios.post(url);
      sendEmail();
      console.log("Distribution success:", response.data);
      alert("Distribution successful!");
      window.location.href = "/managerdistribute";
    } catch (error) {
      console.error("Error distributing project:", error);
      alert("Error in distribution.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
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
                floors.map((floor) => (
                  <option key={floor} value={floor}>
                    Floor {floor}
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
              className={`w-full mt-1 p-2 border ${priceError ? "border-red-500" : "border-gray-300"
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
              // onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            >
              Back
            </button>
            <div className="space-x-4">
              <button
                type="button"
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

export default DistributeFloor;
