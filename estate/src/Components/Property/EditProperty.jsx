import axios from 'axios';
import React, { useState } from 'react';
import Header from '../Header/Header';
import './EditProperty.css';
const EditProperty = () => {
    const [formData, setFormData] = useState({
        numOfBedroom: '',
        numOfBathroom: '',
        furniture: '',
        price: '',
        area: '',
        description: '',
        status: '',
        image: null, // Sử dụng null thay vì chuỗi rỗng
        floorNumber: ''
    });

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        // Nếu là input file, lấy file từ event.target.files
        const newValue = type === 'file' ? event.target.files[0] : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Sử dụng FormData để gửi dữ liệu bao gồm cả file hình ảnh
            const postData = new FormData();
            for (const key in formData) {
                postData.append(key, formData[key]);
            }
            const response = await axios.post('https://localhost:7137/api/EditProperty', postData);
            console.log('Property edited successfully:', response.data);
            // Redirect or display success message as needed
        } catch (error) {
            console.error('Error editing property:', error);
            // Handle error, display error message, etc.
        }
    };

    return (
        <>
            <Header />
            <div className="edit-property-container">
                <h1>Edit Property</h1>
                <form onSubmit={handleSubmit} className="edit-property-form">
                    <div className="form-group">
                        <label>Number of Bedrooms:</label>
                        <input type="text" name="numOfBedroom" value={formData.numOfBedroom} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Number of Bathrooms:</label>
                        <input type="text" name="numOfBathroom" value={formData.numOfBathroom} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Furniture:</label>
                        <input type="text" name="furniture" value={formData.furniture} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Area:</label>
                        <input type="text" name="area" value={formData.area} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <input type="text" name="status" value={formData.status} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input type="file" accept="image/*" name="image" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Floor Number:</label>
                        <input type="text" name="floorNumber" value={formData.floorNumber} onChange={handleChange} />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    );
};

export default EditProperty;