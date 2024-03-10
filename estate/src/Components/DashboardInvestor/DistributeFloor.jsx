import axios from "axios";
import React, { useEffect, useState } from "react";
import "./DashboardInvestor.css";
import Sidebar from "./Sidebar";

const DistributeFloor = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [buildings, setBuildings] = useState([]); // State to hold buildings
  const [buildingId, setBuildingId] = useState(""); // Updated to hold the selected building ID
  const [floors, setFloors] = useState("");
  const [selectFloorId, setSelectFloorId] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedAgency, setSelectedAgency] = useState();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Định nghĩa dữ liệu để gửi
    const distributionData = {
      buildingId: buildingId,
      floor: selectFloorId,
      agencyId: selectedAgency,
    };

    try {
      // Gọi API để submit dữ liệu
      const { buildingId, agencyId, floor } = distributionData;
      const url = `https://localhost:7137/api/Buildings/DistributeFloor?buildingId=${encodeURIComponent(
        buildingId
      )}&agencyId=${encodeURIComponent(agencyId)}&floor=${encodeURIComponent(
        floor
      )}`;
      const response = await axios.post(url);
      // Xử lý khi gửi thành công
      console.log("Distribution success:", response.data);
      alert("Distribution successful!");

      // Có thể reset form hoặc làm gì đó sau khi submit thành công
    } catch (error) {
      // Xử lý khi có lỗi
      console.error("Error distributing project:", error);
      alert("Error in distribution.");
    }
  };

  return (
    <div className="investor-dashboard">
      <Sidebar />
      <div className="distribute-project">
        <h1>Distribute Project</h1>
        <form onSubmit={handleSubmit} className="distribute-form">
          <div className="form-group">
            <label htmlFor="project-name">Project Name</label>
            <select
              id="project-name"
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setSelectFloorId("0");
                setSelectedAgency("Select Recipient")
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
            <label htmlFor="building">Building</label>
            <select
              id="building"
              value={buildingId}
              onChange={(e) => {
                setBuildingId(e.target.value);
              }}
            >
              <option value="">Select Building</option>
              {buildings &&
                buildings.map((building) => (
                  <option key={building.buildingId} value={building.buildingId}>
                    {building.buildingName}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="floors">Floors</label>
            <select
              id="floor"
              //   value={floors.buildingId}
              value={selectFloorId}
              onChange={(e) => setSelectFloorId(e.target.value)}
            >
              <option value="0">0</option>

              {/* {floors &&
                floors.map((floor) => (
                  <option key={floor.buildingId} value={floor.buildingId}>
                    {floor.numberOfFloors}
                  </option>
                ))} */}

              {floors &&
                floors.map((floor) =>
                  Array.from(
                    { length: floor.numberOfFloors },
                    (_, i) => i + 1
                  ).map((floorNumber) => (
                    <option
                      key={`${floor.buildingId}-${floorNumber}`}
                      value={floorNumber}
                    >
                      {floorNumber}
                    </option>
                  ))
                )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="recipient">Agency</label>
            <select
              id="recipient"
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
            >
              <option value="Select Recipient">Select Recipient</option>
              {recipients.map((recipient) => (
                <option key={recipient.agencyId} value={recipient.agencyId}>
                  {`${recipient.firstName} ${recipient.lastName}`}
                </option> // Adjusted for username display
              ))}
            </select>
          </div>

          <div className="buttons">
            <button type="button" className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="send-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributeFloor;
