import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const navigateAndReload = (path) => {
    navigate(path);
    window.location.reload();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    localStorage.removeItem('UserData');
    // Create a FormData object to hold the username and password
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Password', password);




    try {
      const response = await axios.post('https://localhost:7137/api/Users/login', formData, {
        headers: {
          'accept': '*/*', // Adjust this according to what your backend expects
        },
      });

      let jsonData = JSON.stringify(response);
      localStorage.setItem('UserData', jsonData);
      //cách để sử dụng data này trong trang khác 
      // const data = localStorage.getItem("UserData");
      // const data2 = JSON.parse(data);
      // {data2.data.username}
      //cách để xóa local data
      // localStorage.removeItem('UserData');
      // Assuming the response.data contains a property 'role' indicating the user's role
      if (response.data && response.data.roleId) {
        switch (response.data.roleId) {
          case 'Investor':
            navigateAndReload('/');
            break;
          case 'Customer':
            navigateAndReload('/');
            break;
          case 'Agency':
            navigateAndReload('/');
            break;
          default:
            setLoginError('Unknown user role.');
            break;
        }
      } else {
        setLoginError('Login failed: Invalid username');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        const errorMessage = error.response.data.message || 'Incorrect username or password.';
        setLoginError(`Login failed: ${errorMessage}`);
      } else {
        setLoginError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-serif">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-900 py-10">LOG IN</h1>
        <div className="mb-4 text-sm text-center text-gray-600"></div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            LOG IN
          </button>
          {loginError && <div className="text-sm text-red-600">{loginError}</div>}
        </form>
        <div className="mt-6 text-sm text-center text-gray-600">
          <span className="mx-2">|</span>
          <span>No account? <a href="/registration" className="text-blue-600 hover:text-blue-700">Register</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
