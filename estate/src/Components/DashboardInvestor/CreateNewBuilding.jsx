import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const CreateNewProject = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectId: '',
    // description: '',
    name: '',
    numberOfFloor: '',
    numberOfApartment: '',
    fileImage: null,
  });
  const [projects, setProjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (event) => {
    setProjectDetails(prevDetails => ({
      ...prevDetails,
      fileImage: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    // Thiết lập giá trị mặc định cho description nếu trường này để trống
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
      alert('Error creating the building');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="investor-dashboard flex">
    <Sidebar />
    <div className="create-project-container flex-grow p-8">
      <h1 className="text-2xl font-bold mb-8">Create New Project</h1>
      <form className="project-form space-y-6" onSubmit={handleSubmit}>
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
    </div>
  </div>

  );
};

export default CreateNewProject;