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
        const floorData = data.filter(
          (d) => d.buildingId === buildingId
        );
        setFloors(floorData);
        console.log("data", buildingId);
        console.log("first", floorData)
      } catch (error) {
        console.error("Error fetching buildings for project:", error);
        setFloors([]);
      }
    };
    fetchFloor();
  }, [buildingId]); 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log({
      selectedProjectId,
      buildingId,
      floors,
      selectedRecipient,
    });
    alert("Form submitted");
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
              onChange={(e) => setSelectedProjectId(e.target.value)}
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
              value={floors.buildingId}
              onChange={(e) => setSelectFloorId(e.target.value)}
            >
              <option value="">Select Floor</option>
              {floors &&
                floors.map((floors) => (
                  <option key={floors.buildingId} value={floors.buildingId}>
                    {floors.numberOfFloors}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="recipient">Agency</label>
            <select
              id="recipient"
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
            >
              <option value="">Select Recipient</option>
              {recipients.map((recipient) => (
                <option key={recipient.userId} value={recipient.userId}>
                  {recipient.firstName} {recipient.lastName}
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
