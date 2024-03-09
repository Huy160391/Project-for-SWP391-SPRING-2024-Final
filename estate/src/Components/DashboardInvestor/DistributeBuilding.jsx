import React, { useState } from 'react';
import './DashboardInvestor.css'; // Your CSS file for styling

const DistributeProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [building, setBuilding] = useState('');
  const [floors, setFloors] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission to your backend
    console.log({
      projectName,
      building,
      floors,
      recipient,
      description,
    });
  };

  return (
    <div className="distribute-project-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <select id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)}>
            {/* Option values should be dynamic based on data */}
            <option value="vinhomesGrandPark">Vinhomes Grand Park</option>
            {/* ... other options ... */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="building">Building</label>
          <select id="building" value={building} onChange={(e) => setBuilding(e.target.value)}>
            <option value="s01">S01</option>
            {/* ... other options ... */}
          </select>
        </div>

        {/* ... additional form fields ... */}

        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="send-button">Send</button>
        </div>
      </form>
    </div>
  );
};

export default DistributeProjectForm;
