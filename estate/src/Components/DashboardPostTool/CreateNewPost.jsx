import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';



const CreateNewPost = () => {
    const navigate = useNavigate()
    const navigateAndReload = (path) => {
        navigate(path);
        window.location.reload();
    };
    const [postData, setPostData] = useState({
        SalesOpeningDate: '',
        SalesClosingDate: '',
        Description: '',
        PriorityMethod: '',
        BuildingId: '',
        AgencyId: '',
        FileImage: null,
    });

    const [buildings, setBuildings] = useState([]);


    useEffect(() => {
        // Fetch buildings and agencies
        const fetchBuildingsAndAgencies = async () => {
            try {
                const buildingsResponse = await axios.get('https://localhost:7137/api/Buildings');
                setBuildings(buildingsResponse.data);
                const agenciesResponse = await axios.get('https://localhost:7137/api/Agencies');


                if (agenciesResponse.data.length > 0) {
                    setPostData(prevState => ({
                        ...prevState,
                        AgencyId: agenciesResponse.data[0].agencyId,
                    }));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBuildingsAndAgencies();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostData({ ...postData, [name]: value });
    };
    const [image, setImage] = useState(null);


    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]); // For previewing the image
            setPostData({ ...postData, FileImage: event.target.files[0] }); // For form submission
        }
    };


    const isValidDate = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date);
    };

    const isDateAfterOrSame = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return end >= start;
    };

    const isValidDescription = (description) => {
        return description.length >= 10; // Điều kiện: Mô tả phải có ít nhất 10 ký tự
    };

    const isValidSelection = (selection) => {
        return selection !== ""; // Điều kiện: Phải chọn một giá trị
    };

    const isValidFile = (file) => {
        return file && file.size <= 5 * 1024 * 1024; // Điều kiện: File phải nhỏ hơn 5MB
    };
    const [errors, setErrors] = useState({});

    const formData = new FormData();
    Object.keys(postData).forEach(key => {
        formData.append(key, postData[key]);
    });


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('https://localhost:7137/api/Posts/PostInfoWithImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });
            console.log(formData);
            alert("success create post")
            navigateAndReload('/managerpost')
            // Handle success (e.g., clear form, show success message, redirect)
        } catch (error) {
            console.error('Error creating the post:', error);
            // Handle error (e.g., show error message)
        }
        let newErrors = {};

        if (!isValidDate(postData.SalesOpeningDate)) {
            newErrors.SalesOpeningDate = 'Invalid date format.';
        }

        if (!isValidDate(postData.SalesClosingDate)) {
            newErrors.SalesClosingDate = 'Invalid date format.';
        }

        if (!isDateAfterOrSame(postData.SalesOpeningDate, postData.SalesClosingDate)) {
            newErrors.SalesClosingDate = 'Closing date must be after or the same as opening date.';
        }

        if (!isValidDescription(postData.Description)) {
            newErrors.Description = 'Description must be at least 10 characters long.';
        }

        if (!isValidSelection(postData.PriorityMethod)) {
            newErrors.PriorityMethod = 'Please select a priority method.';
        }

        if (!isValidSelection(postData.BuildingId)) {
            newErrors.BuildingId = 'Please select a building.';
        }

        if (!isValidSelection(postData.AgencyId)) {
            newErrors.AgencyId = 'Please select an agency.';
        }

        if (!isValidFile(postData.FileImage)) {
            newErrors.FileImage = 'File must be less than 5MB.';
        }

        setErrors(newErrors);

        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
            return; // Stop the form from submitting
        }
        const formData = postData;





        try {
            await axios.post('https://localhost:7137/api/Posts/PostInfoWithImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(formData);
            alert("success create post")
            navigateAndReload('/managerpost')
            // Handle success (e.g., clear form, show success message, redirect)
        } catch (error) {
            console.error('Error creating the post:', error);
            // Handle error (e.g., show error message)
        }

    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-lg p-10 bg-white shadow-md rounded-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Create New Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Sales Opening Date */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Sales Opening Date</label>
                        <input type="date" name="SalesOpeningDate" onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        {errors.SalesOpeningDate && <div className="mt-1 text-red-500 text-xs italic">{errors.SalesOpeningDate}</div>}
                    </div>

                    {/* Sales Closing Date */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Sales Closing Date</label>
                        <input type="date" name="SalesClosingDate" onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        {errors.SalesClosingDate && <div className="mt-1 text-red-500 text-xs italic">{errors.SalesClosingDate}</div>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Description</label>
                        <textarea name="Description" onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" rows="4"></textarea>
                        {errors.Description && <div className="mt-1 text-red-500 text-xs italic">{errors.Description}</div>}
                    </div>

                    {/* Priority Method */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Priority Method</label>
                        <input type="text" name="PriorityMethod" onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        {errors.PriorityMethod && <div className="mt-1 text-red-500 text-xs italic">{errors.PriorityMethod}</div>}
                    </div>

                    {/* Building ID */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Building ID</label>
                        <select name="BuildingId" onChange={handleInputChange} value={postData.BuildingId} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Building</option>
                            {buildings.map(building => (
                                <option key={building.buildingId} value={building.buildingId}>{building.name}</option>
                            ))}
                        </select>
                        {errors.BuildingId && <div className="mt-1 text-red-500 text-xs italic">{errors.BuildingId}</div>}
                    </div>

                    {/* File Image */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Upload Image</label>
                        <input type="file" name="FileImage" onChange={handleFileChange} className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none" />
                        {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="mt-4 w-auto h-48 rounded-lg" />}
                        {errors.FileImage && <div className="mt-1 text-red-500 text-xs italic">{errors.FileImage}</div>}
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-between">
                        <button type="submit" className=" mt-4 px-12 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md
                                                            hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="ml-4 mt-4 px-12 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md
                                                            hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Back
                        </button>
                    </div>

                </form>
            </div>
        </div>


    );
};

export default CreateNewPost;
