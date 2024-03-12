import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';



const CreateNewPost = () => {
    const navigate = useNavigate()
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
            navigate('/managerpost')
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
            navigate('/managerpost')
            // Handle success (e.g., clear form, show success message, redirect)
        } catch (error) {
            console.error('Error creating the post:', error);
            // Handle error (e.g., show error message)
        }

    };



    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-grow p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {/* Sales Opening Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Sales Opening Date</label>
                        <input type="date" name="SalesOpeningDate" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {errors.SalesOpeningDate && <div className="text-red-500 text-xs italic">{errors.SalesOpeningDate}</div>}
                    </div>

                    {/* Sales Closing Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Sales Closing Date</label>
                        <input type="date" name="SalesClosingDate" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {errors.SalesClosingDate && <div className="text-red-500 text-xs italic">{errors.SalesClosingDate}</div>}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea name="Description" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        {errors.Description && <div className="text-red-500 text-xs italic">{errors.Description}</div>}
                    </div>

                    {/* Priority Method */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Priority Method</label>
                        <input type="text" name="PriorityMethod" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {errors.PriorityMethod && <div className="text-red-500 text-xs italic">{errors.PriorityMethod}</div>}
                    </div>

                    {/* Building ID */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Building ID</label>
                        <select name="BuildingId" onChange={handleInputChange} value={postData.BuildingId} className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select Building</option>
                            {buildings.map(building => (
                                <option key={building.buildingId} value={building.buildingId}>{building.name}</option>
                            ))}
                        </select>
                        {errors.BuildingId && <div className="text-red-500 text-xs italic">{errors.BuildingId}</div>}
                    </div>

                    {/* File Image */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
                        <input type="file" name="FileImage" onChange={handleFileChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" />
                        {/* Display image if available */}
                        {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="mt-4 w-auto h-48 rounded-lg" />}
                        {errors.FileImage && <div className="text-red-500 text-xs italic mt-2">{errors.FileImage}</div>}
                    </div>



                    {/* Form Actions */}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CreateNewPost;
