import React, { useState } from 'react';
import './DashboardInvestor.css'; // Make sure to create this CSS file
import Sidebar from './Sidebar';
const DistributeApartment = () => {
    const [projectName, setProjectName] = useState('');
    const [building, setBuilding] = useState('');
    const [floors, setFloors] = useState('');
    const [recipient, setRecipient] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission
        alert('Form submitted');
    };

    return (
      <div className="investor-dashboard">
      <Sidebar /> {/* Here we include the Sidebar component */}
        <div className="distribute-project">
            <h1>Distribute Project</h1>
            <form onSubmit={handleSubmit} className="distribute-form">
                <label htmlFor="project-name">Project Name</label>
                <select id="project-name" value={projectName} onChange={(e) => setProjectName(e.target.value)}>
                    {/* Options would be fetched from the API */}
                    <option value="vinhomesGrandPark">Vinhomes Grand Park</option>
                    {/* More options */}
                </select>

                <label htmlFor="building">Building</label>
                <select id="building" value={building} onChange={(e) => setBuilding(e.target.value)}>
                    <option value="s01">S01</option>
                    {/* More options */}
                </select>

                <label htmlFor="floors">Floors</label>
                <select id="floors" value={floors} onChange={(e) => setFloors(e.target.value)}>
                    <option value="floors1to3">Tầng 1-3</option>
                    {/* More options */}
                </select>

                <label htmlFor="recipient">Project Recipient</label>
                <select id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                    <option value="agent1">Agent 1</option>
                    {/* More options */}
                </select>

                <div className="buttons">
                    <button type="button" className="cancel-button">Cancel</button>
                    <button type="submit" className="send-button">Send</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default DistributeApartment;
