import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.scss';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login Successful');
        localStorage.setItem('token', data.token);
        console.log('Token:', data.token);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-box">
            <h2>InstaClone</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="email" placeholder="Phone number, username, or email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <button type="submit" className="submit-btn">Log In</button>
            </form>

            <div className="divider">OR</div>

            <button className="google-btn" onClick={() => alert('Google Login Clicked')}>
              <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="G" width="16" />
              Log in with Google
            </button>

            <p style={{ fontSize: '12px', marginTop: '20px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}>Forgot password?</p>
          </div>

          <div className="switch-box">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>

          <div className="get-app">
            <p>Get the app.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <img src="https://imgs.search.brave.com/BarvjVuBAqiiY-FV_blwPG5GYR9NLiwKoxvTTI8vuhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/YXBlLmNvbS93cC1j/b250ZW50L3BuZ19s/b2dvX3ZlY3Rvci9k/b3dubG9hZC1vbi10/aGUtYXBwLXN0b3Jl/LWxvZ28ucG5n" alt="App Store" height="40" />
              <img src="https://tse1.mm.bing.net/th/id/OIP.5XrTLHgx7u1AgW3jR4i2uQHaCN?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Google Play" height="40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;