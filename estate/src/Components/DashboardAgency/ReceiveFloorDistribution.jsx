import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// import Sidebar from "./Sidebar";

const ReceiveFloorDistribution = () => {
    const { agencyId ='' } = useParams();
    const [buildingAndProjects, setBuildingAndProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuildingIds = async () => {
            try {
                const url = `https://localhost:7137/api/Apartments/GetListBuildingIdByAgencyId/${agencyId}`;
                console.log("Requesting URL:", url); // Log the URL for debugging
                const response = await axios.get(url);
                console.log("Response data:", response.data);
                const buildingIds = response.data;

                const buildingAndProjectPromises = buildingIds.map(async (buildingId) => {
                    const buildingResponse = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);
                    const building = buildingResponse.data;

                    const projectResponse = await axios.get(`https://localhost:7137/api/Projects/${building.projectId}`);
                    const project = projectResponse.data;

                    return {
                        buildingId: buildingId,
                        buildingName: building.name,
                        projectName: project.name
                    };
                });

                const buildingsAndProjects = await Promise.all(buildingAndProjectPromises);
                setBuildingAndProjects(buildingsAndProjects);
            } catch (error) {
                console.error("Error fetching buildings and projects:", error);
            }
        };

        fetchBuildingIds();
    }, [agencyId]);

    return (
        <div className="flex min-h-screen bg-gray-50"> {/* Change background for lighter shade */}
    {/* <Sidebar /> */}
    <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8"> {/* Increase size and margin for heading */}
            Building and Project Distribution
        </h1>
        <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-3  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 
                    rounded shadow-lg transition duration-300 ease-in-out transform 
                    hover:-translate-y-1 hover:scale-105 w-32">
                    Back
                </button>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden"> {/* Add more shadow and roundness */}
            <ul className="divide-y divide-gray-300"> {/* Lighten the divider */}
                {buildingAndProjects.map((item, index) => (
                    <li key={index} className="px-6 py-5 hover:bg-gray-50 transition-colors duration-150"> {/* Add padding, hover effect */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xl font-semibold text-blue-600"> {/* Make building name stand out */}
                                    Building: {item.buildingName}
                                </p>
                                <p className="mt-1 text-gray-600"> {/* Standardize text color */}
                                    Project: {item.projectName}
                                </p>
                            </div>
                            <Link 
                                to={`/ManagerListApartmentOfAgency/${agencyId}/${item.buildingId}`} 
                                className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out"> {/* Enhance button appearance */}
                                View
                                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 9.293 4.707A1 1 0 0110 3z" clip-rule="evenodd"></path></svg>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
</div>

    );
};

export default ReceiveFloorDistribution;
