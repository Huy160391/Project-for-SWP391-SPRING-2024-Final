import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
    const { userID } = useParams();
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`https://localhost:7137/api/Users/${userID}`);
                const userData = response.data;
                setUsername(userData.username);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setErrorMessage('Failed to fetch user data. Please try again later.');
            }
        }

        fetchUserData();
    }, [userID]);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New password doesn't match the confirm password.");
            return;
        }



        try {
            const response = await axios.get(`https://localhost:7137/api/Users/${userID}`);
            const userData = response.data;

            if (userData.password !== oldPassword) {
                setErrorMessage('Incorrect old password.');
                return;
            }

            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('password', newPassword);
            await axios.post(`https://localhost:7137/api/Users/UploadUserById/${userID}`, formData);
            setSuccessMessage('Password changed successfully!');
        } catch (error) {
            console.error('Failed to change password:', error);
            setErrorMessage('Failed to change password. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  font-serif">
            <div className="w-full max-w-md px-8 py-6 rounded-md rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-900">Change Password</h1>
                <form onSubmit={handleChangePassword} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            readOnly
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                        <div className="text-gray-500 text-sm opacity-70">
                            *Password must be at least 8 characters long.
                        </div>


                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter your old password"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="text-gray-500 text-sm opacity-70">
                            *Password must be at least 8 characters long.
                        </div>


                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setPasswordError('');
                            }}
                            placeholder="Enter your new password"
                            className={`w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${passwordError && 'border-red-500'
                                }`}
                        />
                        {passwordError && <div className="text-sm text-red-600">{passwordError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <div className="text-gray-500 text-sm opacity-70">
                            *Password must be at least 8 characters long.
                        </div>


                        <input
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            className={`w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${passwordError && 'border-red-500'
                                }`}
                        />
                    </div>
                    <button id="changePasswordBtn" class="mb-9 w-full px-4 py-2 text-sm font-medium rounded-md text-white  bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Change Password</button>

                    {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
                    {successMessage && <div className="text-sm text-green-600">{successMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
