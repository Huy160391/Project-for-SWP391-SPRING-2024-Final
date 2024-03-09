import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListApartmentbyAgency.css'; // Import file CSS tùy chỉnh
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const ListApartmentbyAgency = () => {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        fetchApartments();
    }, []);

    const fetchApartments = async () => {
        try {
            const response = await axios.get('API_ENDPOINT'); // Thay thế 'API_ENDPOINT' bằng đường dẫn API thực tế để lấy danh sách căn hộ từ đại lý
            setApartments(response.data);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    const handleEdit = (apartmentId) => {
        // Xử lý sự kiện khi người dùng nhấn nút "Edit"
        console.log('Edit apartment with ID:', apartmentId);
    };

    const handleReject = (apartmentId) => {
        // Xử lý sự kiện khi người dùng nhấn nút "Reject"
        console.log('Reject apartment with ID:', apartmentId);
    };

    return (
        <>
            <Header />
            <div className="apartment-list-container">
                <h1>List of Apartments</h1>
                <table className="apartment-table">
                    <thead>
                        <tr>
                            <th>Number of Bedrooms</th>
                            <th>Number of Bathrooms</th>
                            <th>Furniture</th>
                            <th>Area</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apartments.map((apartment) => (
                            <tr key={apartment.id}>
                                <td>{apartment.numberOfBedrooms}</td>
                                <td>{apartment.numberOfBathrooms}</td>
                                <td>{apartment.furniture}</td>
                                <td>{apartment.area}</td>
                                <td>{apartment.price}</td>
                                <td>{apartment.description}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEdit(apartment.id)}>Edit</button>
                                    <button className="reject-button" onClick={() => handleReject(apartment.id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default ListApartmentbyAgency;
