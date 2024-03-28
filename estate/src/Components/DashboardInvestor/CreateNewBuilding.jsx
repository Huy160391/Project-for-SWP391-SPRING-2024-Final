import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CreateNewBuilding = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectId: '',
    name: '',
    numberOfFloor: '',
    numberOfApartment: '',
    fileImage: null,
  });
  const [projects, setProjects] = useState([]);
  const [buildings, setBuildings] = useState([]); // Thêm state để lưu trữ danh sách các tòa nhà
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchBuildings = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Buildings');
        setBuildings(response.data);
      } catch (error) {
        console.error('Error fetching buildings:', error);
      }
    };

    fetchProjects();
    fetchBuildings();
  }, []);
  useEffect(() => {
    if (projectDetails.projectId) {
      const selectedProject = projects.find(project => project.projectId === projectDetails.projectId);
      if (selectedProject) {
        // Tìm prefix như "S1" trong tên project
        const match = selectedProject.name.match(/\bS\d+/);
        if (match) {
          const projectPrefix = match[0]; // Lấy được phần như "S1"
          // Cập nhật tên building tự động với dấu "-" sau prefix
          setProjectDetails(prevDetails => ({
            ...prevDetails,
            name: `${projectPrefix}-` // Đây là thay đổi để tự động thêm dấu "-" sau prefix
          }));
        }
      }
    }
  }, [projectDetails.projectId, projects]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      const selectedProject = projects.find(project => project.projectId === projectDetails.projectId);
      if (selectedProject) {
        // Updated regex to match 'S1' from 'Cụm S1' or similar patterns
        const match = selectedProject.name.match(/\bS\d+/); // Finds the prefix, e.g., "S1"
        if (match) {
          const selectedProjectPrefixWithDash = `${match[0]}-`; // Constructs 'S1-' as the prefix
          let newValue = value;
          // Automatically prepend the prefix with a dash if it's not already there when the user starts typing
          if (!newValue.startsWith(selectedProjectPrefixWithDash)) {
              newValue = selectedProjectPrefixWithDash + value.replace(selectedProjectPrefixWithDash, "");
          }
          setProjectDetails(prevDetails => ({ ...prevDetails, [name]: newValue }));
        }
      }
    } else {
      // For all other inputs, just update the value
      setProjectDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    }
  };
  const handleFileChange = (event) => {
    setProjectDetails(prevDetails => ({
      ...prevDetails,
      fileImage: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra xem tên tòa nhà đã tồn tại hay chưa
    const isBuildingNameExists = buildings.some(building => building.name === projectDetails.name);

    if (isBuildingNameExists) {
      alert("A building with this name already exists. Please choose a different name.");
      return;
    }

    const floors = parseInt(projectDetails.numberOfFloor, 10);
    let apartments = parseInt(projectDetails.numberOfApartment, 10);
    const minimumApartments = floors * 10; // Điều kiện mới: Mỗi tầng cần có ít nhất 10 phòng

    // Kiểm tra các điều kiện: số phòng phải lớn hơn hoặc bằng số tầng nhân 10 và số phòng phải chia hết cho số tầng
    if (!floors || !apartments || apartments < minimumApartments || apartments % floors !== 0 || floors < 5) {
      alert(`Number of floors must be at least 5, and number of apartments must be at least ${minimumApartments} (10 per floor) and divisible by the number of floors.`);
      return;
    }
  

    setIsSubmitting(true);

    const finalDetails = {
      ...projectDetails,
      description: projectDetails.description || 'No description provided.',
    };

    const formData = new FormData();
    Object.keys(finalDetails).forEach(key => {
      if (key === 'fileImage') {
        formData.append('FileImage', finalDetails[key]);
      } else {
        formData.append(key, finalDetails[key]);
      }
    });
  
    try {
      await axios.post('https://localhost:7137/api/Buildings/PostInfomationAndImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Building created successfully');
      window.location.href = '/managerbuildings'; // Redirect to /managerbuildings page
    } catch (error) {
      console.error('Error creating the building:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBack = () => {
    window.history.back();
  };


  return (
    <div className="container mx-auto mt-10 font-serif">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">Create New Building</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectId" className="block mb-2 text-sm font-medium text-gray-900">Project Name</label>
          <select id="projectId" name="projectId" onChange={handleInputChange} value={projectDetails.projectId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">Select Project</option>
            {projects.map(project => (
              <option key={project.projectId} value={project.projectId}>{project.name}</option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
          <input id="name" name="name" type="text" onChange={handleInputChange} value={projectDetails.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
  
        {/* <div className="form-group">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <textarea id="description" name="description" onChange={handleInputChange} value={projectDetails.description} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"></textarea>
        </div> */}
  
        <div className="form-group">
          <label htmlFor="numberOfFloor" className="block mb-2 text-sm font-medium text-gray-900">Number Of Floors</label>
          <input id="numberOfFloor" name="numberOfFloor" type="text" onChange={handleInputChange} value={projectDetails.numberOfFloor} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
  
        <div className="form-group">
          <label htmlFor="numberOfApartment" className="block mb-2 text-sm font-medium text-gray-900">Number Of Apartments</label>
          <input id="numberOfApartment" name="numberOfApartment" type="text" onChange={handleInputChange} value={projectDetails.numberOfApartment} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
  
        <div className="form-group">
          <label htmlFor="uploadImage" className="block mb-2 text-sm font-medium text-gray-900">Upload Project Image</label>
          <input id="uploadImage" name="fileImage" type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "/>
        </div>
  
        <div className="form-actions flex justify-end space-x-4">
          <button type="button" className="cancel-button bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md" disabled={isSubmitting}>Cancel</button>
          <button type="submit" className="save-button bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md" disabled={isSubmitting}>Save</button>
        </div>
      
      </form>
      <button onClick={handleBack} className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md">Back</button>
    </div>
  </div>

  );
};

export default CreateNewBuilding;