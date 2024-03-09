import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DashboardInvestor.css'; // Make sure to create this CSS file
import Sidebar from './Sidebar';

const DistributeFloor = () => {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]); // State to hold the fetched projects
    const [building, setBuilding] = useState('');
    const [floors, setFloors] = useState('');
    const [recipient, setRecipient] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Function to fetch projects from the API
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://localhost:7137/api/Projects');
                setProjects(response.data); // Set the fetched projects in the state
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Form submitted');
        // Add form submission logic here
    };

    return (
        <div className="investor-dashboard">
            <Sidebar />
            <div className="distribute-project">
                <h1>Distribute Project</h1>
                <form onSubmit={handleSubmit} className="distribute-form">
                    <label htmlFor="project-name">Project Name</label>
                    <select id="project-name" value={projectName} onChange={(e) => setProjectName(e.target.value)}>
                        <option value="">Select Project</option>
                        {projects.map(project => (
                            <option key={project.projectId} value={project.name}>
                                {project.name}
                            </option>
                        ))}
                    </select>

                    {/* ... rest of the form fields remain unchanged ... */}
                    
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
