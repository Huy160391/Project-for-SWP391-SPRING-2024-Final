import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerProfile = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedCustomer, setUpdatedCustomer] = useState({});
    const [avatar, setAvatar] = useState(null);

    // Correctly placed fetchCustomerInfo function
    const fetchCustomerInfo = async () => {
        try {
            const infoResponse = await axios.get(`https://localhost:7137/api/Customers/${customerId}`);
            let imageSrc = 'https://via.placeholder.com/400x300'; // Khởi tạo hình ảnh mặc định

            try {
                const imageResponse = await axios.get(`https://localhost:7137/api/Customers/GetImage/${customerId}`);
                if (imageResponse && imageResponse.config && imageResponse.config.url) {
                    imageSrc = imageResponse.config.url; // Gán hình ảnh nếu có
                }
            } catch (error) {
                console.error('Failed to fetch customer image:', error);
            }

            // Cập nhật thông tin khách hàng và hình ảnh
            setCustomer({ ...infoResponse.data, avatar: imageSrc });
            setUpdatedCustomer({ ...infoResponse.data });
        } catch (error) {
            console.error("Failed to fetch customer info", error);
        }
    };


    useEffect(() => {
        fetchCustomerInfo();
    }, [customerId]); // Dependency array ensures fetchCustomerInfo is called when customerId changes


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', updatedCustomer.firstName);
        formData.append('lastName', updatedCustomer.lastName);
        formData.append('address', updatedCustomer.address);
        formData.append('gender', updatedCustomer.gender); // Assuming you handle gender in your form
        formData.append('phone', updatedCustomer.phone);
        if (avatar) {
            formData.append('FileImage', avatar); // Ensure 'FileImage' matches the backend model
        }

        try {
            await axios.post(`https://localhost:7137/api/Customers/UploadInformationAndImage/${customerId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Customer updated successfully');
            setEditMode(false);
            fetchCustomerInfo();
            window.location.reload(); // Refresh Customer data
        } catch (error) {
            console.error("Failed to update customer info", error);
            alert('Failed to update customer info');
        }
    };



    if (!customer) return <div>Loading...</div>;

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
                                            <img src={customer.avatar} alt="Customer Avatar" className="object-cover w-full h-full" />
                                        </div>
                                        <h2 className="mt-8 pl-40 text-5xl font-semibold text-white text-center py-16 ">{`${customer.firstName} ${customer.lastName}`}</h2>
                                    </div>

                                </div>
                                <div className="px-3 py-8 bg-gray-800">
                                    <div className="mt-8 ">
                                        <div className="space-y-8">
                                            <div className="p-4 border bg-gray-100 border-gray-200 rounded-lg ">
                                                <p className="text-2xl text-gray-700">
                                                    <span className="font-semibold">Address:</span> {customer.address}
                                                </p>
                                            </div>

                                            <div className="p-4 border bg-gray-100 border-gray-200 rounded-lg ">
                                                <p className="text-2xl  text-gray-700">
                                                    <span className="font-semibold">Gender:</span> {customer.gender}
                                                </p>
                                            </div>

                                            <div className="p-4 border bg-gray-100 border-gray-200 rounded-lg ">
                                                <p className="text-2xl text-gray-700">
                                                    <span className="font-semibold">Phone:</span> {customer.phone}
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
                                        <div className="form-group">
                                            <label className="block gray-100 text-sm font-medium text-gray-200 mb-2">Avatar</label>
                                            <input type="file" onChange={handleAvatarChange} className="block bg-gray-100 w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-100 file:bg-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-50" />
                                            {/* Show the existing avatar if no new avatar is selected, otherwise show the new avatar preview */}
                                            <img src={avatar ? URL.createObjectURL(avatar) : customer.avatar} alt="Customer Avatar" className="mt-4 w-auto h-48 rounded-lg" />
                                        </div>


                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">First Name</label>
                                            <input type="text" name="firstName" value={updatedCustomer.firstName || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Last Name</label>
                                            <input type="text" name="lastName" value={updatedCustomer.lastName || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Address</label>
                                            <input type="text" name="address" value={updatedCustomer.address || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Gender</label>
                                            <input type="text" name="gender" value={updatedCustomer.gender || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-200">Phone</label>
                                            <input type="text" name="phone" value={updatedCustomer.phone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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

export default CustomerProfile;
