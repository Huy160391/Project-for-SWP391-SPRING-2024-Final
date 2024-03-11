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
    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        // Fetch buildings and agencies
        const fetchBuildingsAndAgencies = async () => {
            try {
                const buildingsResponse = await axios.get('https://localhost:7137/api/Buildings');
                setBuildings(buildingsResponse.data);
                const agenciesResponse = await axios.get('https://localhost:7137/api/Agencies');
                setAgencies(agenciesResponse.data);
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

    const handleFileChange = (event) => {
        setPostData({ ...postData, FileImage: event.target.files[0] });
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



    const handleSubmit = async (event) => {
        event.preventDefault();
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
        <div className="investor-dashboard">
            <Sidebar />
            <div className="managers-container">
                <h1 className="form-group">Create New Post</h1>
                <form onSubmit={handleSubmit}>
                    {/* Sales Opening Date */}
                    <div className="form-group">
                        <label>Sales Opening Date</label>
                        <input type="date" name="SalesOpeningDate" onChange={handleInputChange} />
                        {errors.SalesOpeningDate && <div className="error">{errors.SalesOpeningDate}</div>}
                    </div>

                    {/* Sales Closing Date */}
                    <div className="form-group">
                        <label>Sales Closing Date</label>
                        <input type="date" name="SalesClosingDate" onChange={handleInputChange} />
                        {errors.SalesClosingDate && <div className="error">{errors.SalesClosingDate}</div>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="Description" onChange={handleInputChange}></textarea>
                        {errors.Description && <div className="error">{errors.Description}</div>}
                    </div>

                    {/* Priority Method */}
                    <div className="form-group">
                        <label>Priority Method</label>
                        <input type="text" name="PriorityMethod" onChange={handleInputChange} />
                        {errors.PriorityMethod && <div className="error">{errors.PriorityMethod}</div>}
                    </div>

                    {/* Building ID */}
                    <div className="form-group">
                        <label>Building ID</label>
                        <select name="BuildingId" onChange={handleInputChange} value={postData.BuildingId}>
                            <option value="">Select Building</option>
                            {buildings.map(building => (
                                <option key={building.buildingId} value={building.buildingId}>
                                    {building.name}
                                </option>
                            ))}
                        </select>
                        {errors.BuildingId && <div className="error">{errors.BuildingId}</div>}
                    </div>

                    {/* Agency ID
                    <div className="form-group">
                        <label>Agency ID</label>
                        <select name="AgencyId" onChange={handleInputChange} value={postData.AgencyId}>
                            <option value="">Select Agency</option>
                            {agencies.map(agency => (
                                <option key={agency.agencyId} value={agency.agencyId}>
                                    {agency.firstName + " " + agency.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.AgencyId && <div className="error">{errors.AgencyId}</div>}
                    </div> */}

                    {/* File Image */}
                    <div className="form-group">
                        <label>Upload Image</label>
                        <input type="file" name="FileImage" onChange={handleFileChange} />
                        {errors.FileImage && <div className="error">{errors.FileImage}</div>}
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button type="submit" onChange={handleSubmit}>Save</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateNewPost;
