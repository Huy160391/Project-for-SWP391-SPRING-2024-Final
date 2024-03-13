// AgencyProfile.jsx
import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';


import axios from 'axios';

const AgencyProfile = () => {
    const { agencyId } = useParams();
    const navigate = useNavigate();
    const [agency, setAgency] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedAgency, setUpdatedAgency] = useState({});
    const [avatar, setAvatar] = useState(null);


    // Fetch agency info
    useEffect(() => {
        const fetchAgencyInfo = async () => {
            try {
                const infoResponse = await axios.get(`https://localhost:7137/api/Agencies/${agencyId}`);
                const imageResponse = await axios.get(`https://localhost:7137/api/Agencies/GetImage/${agencyId}`);
                setAgency({ ...infoResponse.data, avatar: imageResponse.config.url });
                setUpdatedAgency({ ...infoResponse.data });
            } catch (error) {
                console.error("Failed to fetch agency info", error);
            }
        };
        fetchAgencyInfo();
    }, [agencyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAgency(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(updatedAgency).forEach(key => formData.append(key, updatedAgency[key]));
        if (avatar) formData.append('avatar', avatar);

        try {
            await axios.post(`https://localhost:7137/api/Agencies/UpdateAgency/${agencyId}`, formData);
            setEditMode(false);
            // Optionally, refetch the agency info here to update the UI
        } catch (error) {
            console.error("Failed to update agency info", error);
        }
    };

    if (!agency) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow bg-gradient-to-b from-gray-100 to-gray-100 flex justify-center py-12">

                {!editMode ? (
                    <div className="w-full h-full">
                        <div className="flex min-h-screen bg-gradient-to-b from-gray-100 to-gray-100  flex flex-col justify-center py-12">
                            <div className="max-w-4xl mx-auto bg-white w-full h-full shadow-xl rounded-lg overflow-hidden">
                                <div className="bg-gray-800 w-full h-full px-3 pt-10">
                                    <div className="flex justify-center ">
                                        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-yellow-300 ">
                                            <img src={agency.avatar} alt="Agency Avatar" className="object-cover w-full h-full" />
                                        </div>
                                        <h2 className="mt-8 pl-40 text-5xl font-semibold text-white text-center py-16 ">{`${agency.firstName} ${agency.lastName}`}</h2>
                                    </div>

                                </div>
                                <div className="px-3 py-8 bg-gray-800">
                                    <div className="mt-8 ">
                                        <div className="space-y-8">
                                            <div className="p-4 border bg-gray-100 border-gray-200 rounded-lg ">
                                                <p className="text-2xl text-gray-700">
                                                    <span className="font-semibold">Address:</span> {agency.address}
                                                </p>
                                            </div>

                                            <div className="p-4 border bg-gray-100 border-gray-200 rounded-lg ">
                                                <p className="text-2xl  text-gray-700">
                                                    <span className="font-semibold">Description:</span> {agency.gender}
                                                </p>
                                            </div>

                                            <div className="p-4 border bg-gray-100 border-gray-200 rounded-lg ">
                                                <p className="text-2xl text-gray-700">
                                                    <span className="font-semibold">Phone:</span> {agency.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                onClick={() => setEditMode(true)}
                                                className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md 
                                                            hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Edit Profile
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => navigate(-1)}
                                                className="ml-10 mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md
                                                            hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="w-full h-full">
                        <div className="flex min-h-screen bg-gradient-to-b from-gray-100 to-gray-100  flex flex-col justify-center py-12">
                            <div className="max-w-4xl mx-auto bg-white w-full h-full bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                                <div className="bg-gray-800 w-full h-full px-3 pt-10">
                                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                                        <div className="form-group ">
                                            <label className="block gray-100 text-sm font-medium text-gray-200 mb-2">Avatar</label>
                                            <input type="file" onChange={handleAvatarChange} className="block bg-gray-100 w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-100 file:bg-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-50" />
                                            {avatar && <img src={URL.createObjectURL(avatar)} alt="Agency Avatar" className="mt-4 w-auto h-48 rounded-lg" />}

                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">First Name</label>
                                            <input type="text" name="firstName" value={updatedAgency.firstName || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Last Name</label>
                                            <input type="text" name="lastName" value={updatedAgency.lastName || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Address</label>
                                            <input type="text" name="address" value={updatedAgency.address || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Description</label>
                                            <input type="text" name="gender" value={updatedAgency.gender || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Phone</label>
                                            <input type="text" name="phone" value={updatedAgency.phone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>

                                        <div className="flex  py-4 items-center justify-between space-x-4">
                                            <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
                                            <button type="button" onClick={() => setEditMode(false)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>

    );
};

export default AgencyProfile;
