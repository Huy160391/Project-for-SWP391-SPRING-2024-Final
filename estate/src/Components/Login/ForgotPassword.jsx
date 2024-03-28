import axios from 'axios';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState([]);
    emailjs.init('eIvOaqSYI44I2chb2');

    const sendEmail = (username, password, phone) => {
        // Thay thế các giá trị dưới đây bằng thông tin của bạn từ trang EmailJS
        emailjs.send('Aptx4869', 'template_l4khp3g', {
            username: username, // Thay 'username' bằng tên trường chứa username trong dữ liệu người dùng
            password: password,
            email: phone // Thay 'password' bằng tên trường chứa password trong dữ liệu người dùng
            //Thêm các trường khác nếu cần thiết
        })
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://localhost:7137/api/Users/GetUserByUsername/${username}`);
            const userData = response.data;
            // Kiểm tra nếu dữ liệu trả về từ API không rỗng
            console.log("err", userData)
            if (userData && userData.username) {
                setUserData(userData);
                // Gửi email sau khi lấy dữ liệu người dùng thành công
                sendEmail(userData.username, userData.password, userData.phone);
            } else {
                setError('User not found.');
                setUserData(null);
            }
        } catch (error) {
            setError('Error retrieving user data.');
            setUserData(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-serif">
            <form className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
                <div className="form-field">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username or email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
