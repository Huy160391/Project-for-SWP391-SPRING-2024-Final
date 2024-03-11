import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditApartmentPage = () => {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const [apartment, setApartment] = useState({
        description: '',
        apartmentType: null,
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApartment({ ...apartment, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setApartment({ ...apartment, apartmentType: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', apartment.description);
        if (apartment.apartmentType) {
            formData.append('apartmentType', apartment.apartmentType);
        }

        try {
            await axios.post(`https://localhost:7137/api/Apartments/UploadInformationWithImage/${apartmentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Apartment updated successfully');
            navigate(-1); // Go back to the previous page
        } catch (error) {
            console.error('Error updating apartment:', error.response.data);
            alert('Failed to update apartment.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Edit Apartment</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-1">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" rows="3" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={apartment.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label className="text-gray-700 font-semibold block mb-2">Upload New Property Image</label>
                    <input type="file" className="w-full p-2 border rounded" onChange={handleImageChange} />
                    {image && <img src={URL.createObjectURL(image)} alt="New property" className="mt-4 max-w-xs max-h-60" />}
                </div>
                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditApartmentPage;
