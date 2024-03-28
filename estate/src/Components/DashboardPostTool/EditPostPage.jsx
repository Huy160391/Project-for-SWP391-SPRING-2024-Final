// EditPostPage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const EditPostPage = () => {
    const [post, setPost] = useState({
        SalesOpeningDate: '',
        SalesClosingDate: '',
        Description: '',
        PriorityMethod: '',
        BuildingId: '',
        FileImage: null

    });
    const [buildings, setBuildings] = useState([]);
    const [image, setImage] = useState(null); // Change this to manage single image as per your backend
    const { postId } = useParams();
    const navigate = useNavigate();
    const [editError, setEditError] = useState('');


    useEffect(() => {
        // Fetch buildings and agencies
        const fetchBuildings = async () => {
            try {
                const buildingsResponse = await axios.get(`https://localhost:7137/api/Buildings/`);
                setBuildings(buildingsResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBuildings();
    }, []);
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`https://localhost:7137/api/Posts/${postId}`);
                // console.log(response)
                const salesClosingDate = new Date(response.data.salesClosingDate);
                const now = new Date();
                if (salesClosingDate <= now) {
                    setEditError('This post cannot be edited as the Sales Closing Date has passed.');
                    return; // Prevent further execution
                }

                const OpeningDate = response.data.salesOpeningDate.split('T')[0]
                const ClosingDate = response.data.salesClosingDate.split('T')[0]
                setPost(
                    {

                        SalesOpeningDate: OpeningDate,
                        SalesClosingDate: ClosingDate,
                        Description: response.data.description,
                        PriorityMethod: response.data.priorityMethod,
                        BuildingId: response.data.buildingId,
                        FileImage: null

                    }
                );

            } catch (error) {
                console.error('Failed to fetch post data:', error);
            }
        };
        fetchPostData();
    }, [postId]);

    const handleChange = (e) => {
        // console.log(e.)
        const { name, value } = e.target;
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files.length) {
                setImage(e.target.files[0]); // Assuming you want to handle one file
        }
    };
    const [errors, setErrors] = useState({});
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {};

        if (!isValidDate(post.SalesOpeningDate)) {
            newErrors.SalesOpeningDate = 'Invalid date format.';
        }

        if (!isValidDate(post.SalesClosingDate)) {
            newErrors.SalesClosingDate = 'Invalid date format.';
        }

        if (!isDateAfterOrSame(post.SalesOpeningDate, post.SalesClosingDate)) {
            newErrors.SalesClosingDate = 'Closing date must be after or the same as opening date.';
        }

        if (!isValidDescription(post.Description)) {
            newErrors.Description = 'Description must be at least 10 characters long.';
        }

        if (!isValidSelection(post.PriorityMethod)) {
            newErrors.PriorityMethod = 'Please select a priority method.';
        }

        if (!isValidSelection(post.BuildingId)) {
            newErrors.BuildingId = 'Please select a building.';
        }

        if (!isValidSelection(post.AgencyId)) {

            newErrors.AgencyId = 'Please select an agency.';
        }

        if (!isValidFile(image)) {
            newErrors.FileImage = 'File must be less than 5MB. and more than 0MB';
        }
        setErrors(newErrors);

        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
            return; // Stop the form from submitting
        }

        const formData = new FormData();
        formData.append('SalesOpeningDate', post.SalesOpeningDate);
        formData.append('SalesClosingDate', post.SalesClosingDate);
        formData.append('Description', post.Description);
        formData.append('PriorityMethod', post.PriorityMethod);
        formData.append('BuildingId', post.BuildingId);

        if (image) {
            formData.append('FileImage', image);
        }

        try {
            await axios.post(`https://localhost:7137/api/Posts/UploadInformationWithImage/${postId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert("success edit")
            navigate('/managerpost'); // Adjust the route as necessary
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    console.log(post.SalesClosingDate)

    return (
        <div className="flex min-h-screen bg-gray-100 font-serif">
           
            <div className="flex-grow max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-10">Edit Post</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Sales Opening Date</label>
                        <input type="date" name="SalesOpeningDate" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={post.SalesOpeningDate || ''} onChange={handleChange} />
                        {errors.SalesOpeningDate && <div className="text-red-500 text-xs mt-2">{errors.SalesOpeningDate}</div>}

                    </div>

                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Sales Closing Date</label>
                        <input type="date" name="SalesClosingDate" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={post.SalesClosingDate || ''} onChange={handleChange} />

                        {editError && <div className="text-red-500 text-xl mb-4">{editError}</div>}

                        {errors.SalesClosingDate && <p className="text-red-500 text-xs mt-2">{errors.SalesClosingDate}</p>}
                    </div>

                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Description</label>
                        <textarea name="Description" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={post.Description || ''} onChange={handleChange}></textarea>
                        {errors.Description && <p className="text-red-500 text-xs mt-2">{errors.Description}</p>}
                    </div>

                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Priority Method</label>
                        <input type="text" name="PriorityMethod" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={post.PriorityMethod || ''} onChange={handleChange} />
                        {errors.PriorityMethod && <p className="text-red-500 text-xs mt-2">{errors.PriorityMethod}</p>}
                    </div>

                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Building ID</label>
                        <select name="BuildingId" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} value={post.BuildingId || ''}>
                            <option value="">Select Building</option>
                            {buildings.map(building => (
                                <option key={building.buildingId} value={building.buildingId}>{building.name}</option>
                            ))}
                        </select>
                        {errors.BuildingId && <p className="text-red-500 text-xs mt-2">{errors.BuildingId}</p>}
                    </div>

                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Upload New Property Image</label>
                        <input type="file" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" onChange={handleImageChange} />
                        {image && <img src={URL.createObjectURL(image)} alt="New post" className="mt-4 w-auto h-48 rounded-lg" />}
                        {errors.FileImage && <div className="text-red-500 text-xs mt-2">{errors.FileImage}</div>}
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default EditPostPage;
