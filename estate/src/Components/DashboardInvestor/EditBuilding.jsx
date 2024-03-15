import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBuilding = () => {
  const [buildingDetails, setBuildingDetails] = useState({
    projectId: "",
    name: "",
    numberOfFloor: "",
    numberOfApartment: "",
    fileImage: null,
  });
  const [projects, setProjects] = useState([]);
  const [buildings, setBuildings] = useState([]); // Lưu trữ danh sách các tòa nhà để kiểm tra trùng tên
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { buildingId } = useParams();

  useEffect(() => {
    const fetchProjectsAndBuildings = async () => {
      try {
        const [projectsResponse, buildingsResponse] = await Promise.all([
          axios.get("https://localhost:7137/api/Projects"),
          axios.get("https://localhost:7137/api/Buildings"),
        ]);
        setProjects(projectsResponse.data);
        setBuildings(buildingsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBuildingDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7137/api/Buildings/${buildingId}`
        );
        setBuildingDetails({ ...response.data, fileImage: null });
      } catch (error) {
        console.error("Error fetching building details:", error);
      }
    };

    fetchProjectsAndBuildings();
    fetchBuildingDetails();
  }, [buildingId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      const selectedProject = projects.find(
        (project) => project.projectId === buildingDetails.projectId
      );
      if (selectedProject) {
        const selectedProjectPrefix = selectedProject.name; // 'S1', 'S2', ...
        // Kiểm tra giá trị nhập vào có phải là tiền tố của dự án đang được chọn
        if (value.startsWith(selectedProjectPrefix)) {
          // Lấy phần số sau tiền tố
          const buildingNumber = value.slice(selectedProjectPrefix.length);
          // Kiểm tra xem phần số có hợp lệ (chỉ chấp nhận 2 chữ số)
          if (buildingNumber.length <= 2 && /^[0-9]*$/.test(buildingNumber)) {
            setBuildingDetails((prevDetails) => ({
              ...prevDetails,
              [name]: value,
            }));
          } else if (buildingNumber.length > 2) {
            // Nếu người dùng nhập quá 2 chữ số, hiển thị thông báo và không cập nhật giá trị
            alert("You can only add two more digits after the project prefix.");
          }
        } else if (value === selectedProjectPrefix || value === "") {
          // Cho phép xóa hoàn toàn hoặc chỉ có tiền tố
          setBuildingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
          }));
        } else {
          alert(
            `Building name must start with the project prefix "${selectedProjectPrefix}".`
          );
        }
      }
    } else {
      setBuildingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };
  const handleFileChange = (event) => {
    setBuildingDetails((prevDetails) => ({
      ...prevDetails,
      fileImage: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra tên tòa nhà không được trùng với các tòa nhà khác (ngoại trừ chính nó)
    const isBuildingNameExists = buildings.some(
      (building) =>
        building.name === buildingDetails.name &&
        building.buildingId !== buildingId
    );
    if (isBuildingNameExists) {
      alert(
        "A building with this name already exists. Please choose a different name."
      );
      return;
    }

    const floors = parseInt(buildingDetails.numberOfFloor, 10);
    const apartments = parseInt(buildingDetails.numberOfApartment, 10);
    const minimumApartments = floors * 10; // Mỗi tầng cần có ít nhất 10 căn hộ

    if (
      !floors ||
      !apartments ||
      apartments < minimumApartments ||
      apartments % floors !== 0
    ) {
      alert(
        `Number of apartments must be at least ${minimumApartments} (10 per floor) and divisible by the number of floors.`
      );
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    Object.keys(buildingDetails).forEach((key) => {
      formData.append(key, buildingDetails[key]);
    });

    try {
      await axios.put(
        `https://localhost:7137/api/Buildings/${buildingId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Building updated successfully");
      navigate("/managerbuildings"); // Điều hướng người dùng đến trang quản lý sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating the building:", error);
      alert("Failed to update the building. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Edit Building</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Project Name Selection */}
          <div className="form-group">
            <label
              htmlFor="projectName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Project Name
            </label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              value={
                projects.find(
                  (project) => project.projectId === buildingDetails.projectId
                )?.name || ""
              }
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
            />
          </div>

          {/* Building Name Input */}
          <div className="form-group">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Building Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              value={buildingDetails.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Number Of Floors Input */}
          <div className="form-group">
            <label
              htmlFor="numberOfFloor"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Number Of Floors
            </label>
            <input
              id="numberOfFloor"
              name="numberOfFloor"
              type="number"
              onChange={handleInputChange}
              value={buildingDetails.numberOfFloors}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Number Of Apartments Input */}
          <div className="form-group">
            <label
              htmlFor="numberOfApartment"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Number Of Apartments
            </label>
            <input
              id="numberOfApartment"
              name="numberOfApartment"
              type="number"
              onChange={handleInputChange}
              value={buildingDetails.numberOfApartments}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Upload Image Input */}
          <div className="form-group">
            <label
              htmlFor="uploadImage"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Upload Building Image
            </label>
            <input
              id="uploadImage"
              name="fileImage"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              to="/managerbuildings"
              className="cancel-button bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="save-button bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
              disabled={isSubmitting}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBuilding;
