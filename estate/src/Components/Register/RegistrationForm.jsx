import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    image: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null); // Dùng để lưu trữ và hiển thị hình ảnh được chọn
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
      setAvatarPreview(URL.createObjectURL(files[0])); // Tạo và cập nhật URL hình ảnh để hiển thị
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' }); // Reset specific field error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset all errors

    // Xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords don't match." });
      return;
    }

    // Validate form fields
    let formIsValid = true;
    let newErrors = {};

    if (!formData.firstName.trim()) {
      formIsValid = false;
      newErrors.firstName = 'First Name is required.';
    }

    if (!formData.lastName.trim()) {
      formIsValid = false;
      newErrors.lastName = 'Last Name is required.';
    }

    if (!formData.gender.trim()) {
      formIsValid = false;
      newErrors.gender = 'Gender is required.';
    }

    if (!formData.username.trim()) {
      formIsValid = false;
      newErrors.username = 'Username is required.';
    }

    if (!formData.password.trim()) {
      formIsValid = false;
      newErrors.password = 'Password is required.';
    }

    if (!formData.confirmPassword.trim()) {
      formIsValid = false;
      newErrors.confirmPassword = 'Confirm Password is required.';
    }

    if (!formData.address.trim()) {
      formIsValid = false;
      newErrors.address = 'Address is required.';
    }

    if (!formData.phone.trim()) {
      formIsValid = false;
      newErrors.phone = 'Phone is required.';
    }

    if (!formData.image) {
      formIsValid = false;
      newErrors.image = 'Image is required.';
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        dataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.post('https://localhost:7137/api/Users/register', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/login');
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">Đăng Ký</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Gender</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username or email"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.image ? 'border-red-500' : ''}`}
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>
        </div>
        {/* Nút Đăng ký */}
        <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">ĐĂNG KÝ</button>
        {/* Liên kết chuyển đến trang đăng nhập */}
        <div className="text-sm text-center">
          Đã có tài khoản? <Link to="/" className="text-blue-600 hover:text-blue-700">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
