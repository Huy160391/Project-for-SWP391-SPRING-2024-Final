// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const DistributeFloor = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [buildings, setBuildings] = useState([]); // State to hold buildings
//   const [buildingId, setBuildingId] = useState(""); // Updated to hold the selected building ID
//   const [floors, setFloors] = useState("");
//   const [selectFloorId, setSelectFloorId] = useState("");
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState("");
//   const [selectedAgency, setSelectedAgency] = useState();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const { data } = await axios.get("https://localhost:7137/api/Projects");
//         setProjects(data);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     const fetchBuildingsForProject = async (projectId) => {
//       if (!projectId) {
//         setBuildings([]);
//         return;
//       }
//       try {
//         const { data } = await axios.get(
//           `https://localhost:7137/api/Buildings/GetProjectBuildingDetails`
//         );
//         const buildingData = data.filter(
//           (d) => d.projectId === selectedProjectId
//         );
//         setBuildings(buildingData);
//       } catch (error) {
//         console.error("Error fetching buildings for project:", error);
//         setBuildings([]);
//       }
//     };

//     fetchBuildingsForProject(selectedProjectId);
//   }, [selectedProjectId]);

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       try {
//         const { data } = await axios.get("https://localhost:7137/api/Agencies");
//         // const dat = data.filter(
//         //   (user) => user.roleId === "Agency"
//         // );
//         setRecipients(data);
//       } catch (error) {
//         console.error("Error fetching recipients:", error);
//       }
//     };
//     fetchRecipients();
//   }, []);

//   useEffect(() => {
//     const fetchFloor = async () => {
//       try {
//         const { data } = await axios.get(
//           "https://localhost:7137/api/Buildings"
//         );
//         const floorData = data.filter((d) => d.buildingId === buildingId);
//         setFloors(floorData);
//       } catch (error) {
//         console.error("Error fetching buildings for project:", error);
//         setFloors([]);
//       }
//     };
//     fetchFloor();
//   }, [buildingId]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Định nghĩa dữ liệu để gửi
//     const distributionData = {
//       buildingId: buildingId,
//       floor: selectFloorId,
//       agencyId: selectedAgency,
//     };

//     try {
//       // Gọi API để submit dữ liệu
//       const { buildingId, agencyId, floor } = distributionData;
//       const url = `https://localhost:7137/api/Buildings/DistributeFloor?buildingId=${encodeURIComponent(
//         buildingId
//       )}&agencyId=${encodeURIComponent(agencyId)}&floor=${encodeURIComponent(
//         floor
//       )}`;
//       const response = await axios.post(url);
//       // Xử lý khi gửi thành công
//       console.log("Distribution success:", response.data);
//       alert("Distribution successful!");

//       // Có thể reset form hoặc làm gì đó sau khi submit thành công
//     } catch (error) {
//       // Xử lý khi có lỗi
//       console.error("Error distributing project:", error);
//       alert("Error in distribution.");
//     }
//   };
//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Distribute Project</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="form-group">
//             <label htmlFor="project-name" className="block text-gray-700">Project Name</label>
//             <select
//               id="project-name"
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={selectedProjectId}
//               onChange={(e) => {
//                 setSelectedProjectId(e.target.value);
//                 setSelectFloorId("0");
//                 setSelectedAgency("Select Recipient");
//               }}
//             >
//               <option value="">Select Project</option>
//               {projects.map((project) => (
//                 <option key={project.projectId} value={project.projectId}>
//                   {project.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="building" className="block text-gray-700">Building</label>
//             <select
//               id="building"
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={buildingId}
//               onChange={(e) => {
//                 setBuildingId(e.target.value);
//               }}
//             >
//               <option value="">Select Building</option>
//               {buildings.map((building) => (
//                 <option key={building.buildingId} value={building.buildingId}>
//                   {building.buildingName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="floors" className="block text-gray-700">Floors</label>
//             <select
//               id="floor"
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={selectFloorId}
//               onChange={(e) => setSelectFloorId(e.target.value)}
//             >
//               <option value="0">Select Floor</option>
//               {floors && floors.map((floor, index) =>
//                 Array.from({ length: floor.numberOfFloors }, (_, i) => (
//                   <option
//                     key={`${floor.buildingId}-${index}-${i}`}
//                     value={i + 1}
//                   >
//                     Floor {i + 1}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="recipient" className="block text-gray-700">Agency</label>
//             <select
//               id="recipient"
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={selectedAgency}
//               onChange={(e) => setSelectedAgency(e.target.value)}
//             >
//               <option value="Select Recipient">Select Recipient</option>
//               {recipients.map((recipient) => (
//                 <option key={recipient.agencyId} value={recipient.agencyId}>
//                   {`${recipient.firstName} ${recipient.lastName}`}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-between">
//             <button type="button" onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out">
//               Back
//             </button>
//             <div className="space-x-4">
//               <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out">
//                 Cancel
//               </button>
//               <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out">
//                 Send
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DistributeFloor;

import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false); // New state for loading
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
    setIsLoading(true);
  
    try {
      // Kiểm tra xem có căn hộ nào trên tầng được chọn đã được phân công cho agency không
      const apartmentsResponse = await axios.get(`https://localhost:7137/api/Apartments/GetApartmentsByAgencyIdAndBuildingId/${selectedAgency}/${buildingId}`);
      const isAssignedOnFloor = apartmentsResponse.data.some(apartment => apartment.floorNumber === parseInt(selectFloorId));
  
      if (isAssignedOnFloor) {
        alert("This floor is already assigned to the selected agency.");
        setIsLoading(false);
        return;
      }
  
      // Tiến hành phân công tầng cho đại lý nếu chưa được phân công
      const distributeResponse = await axios.post(`https://localhost:7137/api/Buildings/DistributeFloor`, {
        buildingId: buildingId,
        floorNumber: parseInt(selectFloorId),
        agencyId: selectedAgency
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Kiểm tra phản hồi từ server sau khi gửi yêu cầu phân công
      if (distributeResponse.status === 200) {
        console.log("Distribution success:", distributeResponse.data);
        alert("Floor distributed successfully!");
      } else {
        console.error("Distribution failed:", distributeResponse.data);
        alert("Failed to distribute floor.");
      }
    } catch (error) {
      console.error("Error checking floor assignment or distributing floor:", error);
      alert("Error in distribution.");
    } finally {
      setIsLoading(false);  // Đảm bảo isLoading được reset về false sau mọi hoàn cảnh
    }
  };
  const handleBack = () => {
    window.history.back();
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
