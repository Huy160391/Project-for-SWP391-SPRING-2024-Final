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
    const [descriptionError, setDescriptionError] = useState('');
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

    //Check valid for description: at least 10 characters and not exceed 1000 characters
    useEffect(() => {

        if (apartment.description) {

            if (apartment.description && apartment.description.length < 10) {
                setDescriptionError('Description must be at least 10 characters long.');
            } else if (apartment.description && apartment.description.length > 1000) {
                setDescriptionError('Description cannot exceed 1000 characters.');
            } else {
                setDescriptionError('');

            }
        }
    }, [apartment.description]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApartment(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            setImage(e.target.files[0]); // Assuming you want to handle one file
        }
    };

    const [errors, setErrors] = useState({
        description: '',
        numberOfBedrooms: '',
        numberOfBathrooms: '',
        furniture: '',
        price: '',
        area: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any required field is empty
        let formValid = true;
        const newErrors = { ...errors };
        if (!apartment.description) {
            newErrors.description = 'Please fill in this field.';
            formValid = false;
        }
        if (!apartment.numberOfBedrooms) {
            newErrors.numberOfBedrooms = 'Please select the number of bedrooms.';
            formValid = false;
        }
        if (!apartment.numberOfBathrooms) {
            newErrors.numberOfBathrooms = 'Please select the number of bathrooms.';
            formValid = false;
        }
        if (!apartment.furniture) {
            newErrors.furniture = 'Please select the furniture type.';
            formValid = false;
        }
        if (!apartment.price) {
            newErrors.price = 'Please fill in this field.';
            formValid = false;
        }
        if (!apartment.area) {
            newErrors.area = 'Please fill in this field.';
            formValid = false;
        }

        setErrors(newErrors);

        if (!formValid) {
            return;
        }

        const formData = new FormData();
        formData.append('description', apartment.description);
        formData.append('numberOfBedrooms', apartment.numberOfBedrooms);
        formData.append('numberOfBathrooms', apartment.numberOfBathrooms);
        formData.append('furniture', apartment.furniture);
        formData.append('price', apartment.price);
        formData.append('area', apartment.area);

        if (image) { // Ensure there's an image to upload
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
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                        {descriptionError && <p className="text-red-500">{descriptionError}</p>} {/* Validation for number of characters in description*/}
                    </div>

                    {/* Number of Bedrooms */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Number of Bedrooms</label>
                        <select
                            name="numberOfBedrooms"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.numberOfBedrooms || ''}
                            onChange={handleChange}
                        >
                            <option value="">Select Number of Bedrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        {errors.numberOfBedrooms && <p className="text-red-500">{errors.numberOfBedrooms}</p>}
                    </div>

                    {/* Number of Bathrooms */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Number of Bathrooms</label>
                        <select
                            name="numberOfBathrooms"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.numberOfBathrooms || ''}
                            onChange={handleChange}
                        >
                            <option value="">Select Number of Bathrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        {errors.numberOfBathrooms && <p className="text-red-500">{errors.numberOfBathrooms}</p>}
                    </div>

                    {/* Furniture Type */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Furniture Type</label>
                        <select
                            name="furniture"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.furniture || ''}
                            onChange={handleChange}
                        >
                            <option value="">Select Furniture Type</option>
                            <option value="Fully Furnished">Fully Furnished</option>
                            <option value="Partially Furnished">Partially Furnished</option>
                            <option value="Not Furnished">Not Furnished</option>
                        </select>
                        {errors.furniture && <p className="text-red-500">{errors.furniture}</p>}
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.price}
                            onChange={handleChange}
                            min="0"
                        />
                        {errors.price && <p className="text-red-500">{errors.price}</p>}
                    </div>

                    {/* Area */}
                    <div className="form-group">
                        <label className="text-gray-700 font-semibold block mb-2">Area (sqft)</label>
                        <input
                            type="number"
                            name="area"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apartment.area}
                            onChange={handleChange}
                            min="0"
                        />
                        {errors.area && <p className="text-red-500">{errors.area}</p>}
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
