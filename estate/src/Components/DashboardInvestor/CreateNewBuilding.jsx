import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CreateBuilding.css';
import Sidebar from './Sidebar';

const CreateNewProject = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectId: '',
    description: '',
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
    const formData = new FormData();
    Object.keys(projectDetails).forEach(key => {
      if (key === 'fileImage') {
        formData.append('FileImage', projectDetails[key]);
      } else {
        formData.append(key, projectDetails[key]);
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
    <div className="investor-dashboard">
      <Sidebar />
      <div className="create-project-container">
        <h1>Create New Project</h1>
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectId">Project Name</label>
            <select id="projectId" name="projectId" onChange={handleInputChange} value={projectDetails.projectId}>
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.projectId} value={project.projectId}>{project.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Building Name</label>
            <input id="name" name="name" type="text" onChange={handleInputChange} value={projectDetails.name} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" onChange={handleInputChange} value={projectDetails.description}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfFloor">Number Of Floors</label>
            <input id="numberOfFloor" name="numberOfFloor" type="text" onChange={handleInputChange} value={projectDetails.numberOfFloor} />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfApartment">Number Of Apartments</label>
            <input id="numberOfApartment" name="numberOfApartment" type="text" onChange={handleInputChange} value={projectDetails.numberOfApartment} />
          </div>

          <div className="form-group">
            <label htmlFor="uploadImage">Upload Project Image</label>
            <input id="uploadImage" name="fileImage" type="file" onChange={handleFileChange} />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="save-button" disabled={isSubmitting}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProject;