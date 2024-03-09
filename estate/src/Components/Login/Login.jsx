import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginDetails = {
        username: username,
        password: password,
      };

      const response = await axios.post('https://localhost:7137/api/Users/login', loginDetails);
      
      if (response.data != null) {
        navigate('/realestatelisting');
      } else {
        setLoginError('Incorrect username or password.');
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
    <div className="login-container">
      <div className="login-form">
        <h1>Đăng Nhập</h1>
        <div className="divider">or Login with Username</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">ĐĂNG NHẬP</button>
          {loginError && <div className="login-error">{loginError}</div>}
        </form>
        <div className="login-footer">
          <a href="/forgot-password">Quên mật khẩu?</a>
          <span>Chưa có tài khoản? <a href="/registration">Đăng ký</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
