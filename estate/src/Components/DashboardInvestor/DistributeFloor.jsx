import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DashboardInvestor.css';
import Sidebar from './Sidebar';

const DistributeFloor = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [buildings, setBuildings] = useState([]); // State to hold buildings
    const [selectedBuildingId, setSelectedBuildingId] = useState(''); // Updated to hold the selected building ID
    const [floors, setFloors] = useState('');
    const [recipients, setRecipients] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get('https://localhost:7137/api/Projects');
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
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
                const { data } = await axios.get(`https://localhost:7137/api/Buildings/projects/${projectId}`);
                setBuildings(data);
            } catch (error) {
                console.error('Error fetching buildings for project:', error);
                setBuildings([]);
            }
        };

        fetchBuildingsForProject(selectedProjectId);
    }, [selectedProjectId]);

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const { data } = await axios.get('https://localhost:7137/api/Users');
                const agencyRecipients = data.filter(user => user.roleId === 'Agency');
                setRecipients(agencyRecipients);
            } catch (error) {
                console.error('Error fetching recipients:', error);
            }
        };
        fetchRecipients();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log({
            selectedProjectId,
            selectedBuildingId,
            floors,
            selectedRecipient,
            description,
        });
        alert('Form submitted');
    };

    return (
        <div className="investor-dashboard">
            <Sidebar />
            <div className="distribute-project">
                <h1>Distribute Project</h1>
                <form onSubmit={handleSubmit} className="distribute-form">
                    <div className="form-group">
                        <label htmlFor="project-name">Project Name</label>
                        <select id="project-name" value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
                            <option value="">Select Project</option>
                            {projects.map(project => (
                                <option key={project.projectId} value={project.projectId}>{project.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="building">Building</label>
                        <select id="building" value={selectedBuildingId} onChange={(e) => setSelectedBuildingId(e.target.value)}>
                            <option value="">Select Building</option>
                            {buildings.map(building => (
                                <option key={building.buildingId} value={building.buildingId}>{building.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipient">Project Recipient</label>
                        <select 
                            id="recipient" 
                            value={selectedRecipient} 
                            onChange={(e) => setSelectedRecipient(e.target.value)}
                        >
                            <option value="">Select Recipient</option>
                            {recipients.map((recipient) => (
                                <option key={recipient.userId} value={recipient.userId}>{recipient.username}</option> // Adjusted for username display
                            ))}
                        </select>
                    </div>

                    <div className="buttons">
                        <button type="button" className="cancel-button">Cancel</button>
                        <button type="submit" className="send-button">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DistributeFloor;
