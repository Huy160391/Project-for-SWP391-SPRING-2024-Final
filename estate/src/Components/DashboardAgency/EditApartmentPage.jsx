import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditApartmentPage = () => {
    const [apartment, setApartment] = useState({
        description: '',
        numberOfBedrooms: 0,
        numberOfBathrooms: 0,
        furniture: '',
        price: 0,
        area: 0,
    });
    const [image, setImage] = useState(null);
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const navigateAndReload = (path) => {
        navigate(path);
        window.location.reload();
      };

    useEffect(() => {
        const fetchApartmentData = async () => {
            try {
                const response = await axios.get(`https://localhost:7137/api/Apartments/${apartmentId}`);
                setApartment({ ...response.data, ApartmentType: null }); // Reset the file image initially
            } catch (error) {
                console.error('Failed to fetch apartment data:', error);
            }
        };
        fetchApartmentData();
    }, [apartmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApartment(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            setImage(e.target.files[0]); // Assuming you want to handle one file
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', apartment.description);
        formData.append('numberOfBedrooms', apartment.numberOfBedrooms);
        formData.append('numberOfBathrooms', apartment.numberOfBathrooms);
        formData.append('furniture', apartment.furniture);
        formData.append('price', apartment.price);
        formData.append('area', apartment.area);

        if (image) { // Ensure there's an image to uploadnpm 
            formData.append('ApartmentType', image);
        }
        
        try {
            await axios.post(`https://localhost:7137/api/Apartments/UploadInformationWithImage/${apartmentId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Apartment updated successfully');
            navigateAndReload(`/ManagerListApartmentOfAgency/${apartment.agencyId}/${apartment.buildingId}`);
 // Adjust the route as necessary
        } catch (error) {
            console.error('Error updating apartment:', error);
        }
    };
 console.log("concak", apartmentId)
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-grow max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-10">Edit Apartment</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Insert form fields here */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Upload New Apartment Image</label>
                        <input type="file" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" onChange={handleImageChange} />
                        {image && <img src={URL.createObjectURL(image)} alt="Apartment Preview" className="mt-4 w-auto h-48 rounded-lg" />}
                    </div>
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Description</label>
                        <textarea name="description" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={apartment.description || ''} onChange={handleChange}></textarea>
                    </div>

                    {/* Number of Bedrooms */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Number of Bedrooms</label>
                        <input
                            type="number"
                            name="numberOfBedrooms"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.numberOfBedrooms || 0}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>

                    {/* Number of Bathrooms */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Number of Bathrooms</label>
                        <input
                            type="number"
                            name="numberOfBathrooms"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.numberOfBathrooms || 0}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>

                    {/* Furniture Type */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Furniture Type</label>
                        <input
                            type="text"
                            name="furniture"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.furniture || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.price || 0}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>

                    {/* Area */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Area (sqft)</label>
                        <input
                            type="number"
                            name="area"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.area || 0}
                            onChange={handleChange}
                            min="0"
                        />
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

export default EditApartmentPage;
