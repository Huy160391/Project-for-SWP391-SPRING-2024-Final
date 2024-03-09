import React, { useState } from 'react';
import './DashboardInvestor.css'; // Your CSS file for styling

const CreateNewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [overview, setOverview] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [area, setArea] = useState('');
  const [numberOfFloors, setNumberOfFloors] = useState('');
  const [numberOfApartments, setNumberOfApartments] = useState('');
  const [address, setAddress] = useState('');
  const [projectImages, setProjectImages] = useState([]);

  const handleImageUpload = (event) => {
    // Handle the image file upload logic
    const file = event.target.files[0];
    // You would handle file uploading here
    console.log('Uploading', file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic
    console.log({
      projectName,
      overview,
      price,
      status,
      area,
      numberOfFloors,
      numberOfApartments,
      address,
      projectImages,
    });
  };

  return (
    <div className="create-new-project">
      <aside className="sidebar">
        {/* Sidebar content with navigation goes here */}
      </aside>
      <main className="main-content">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="overview">Overview</label>
              <textarea
                id="overview"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="forSale">For Sale</option>
                {/* More options */}
              </select>
            </div>
          </div>

          {/* Additional form fields for area, number of floors/apartments, and address */}

          <div className="form-group">
            <label htmlFor="upload">Upload Project Image</label>
            <input
              type="file"
              id="upload"
              onChange={handleImageUpload}
              multiple
            />
            {/* Display uploaded images */}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateNewProject;
