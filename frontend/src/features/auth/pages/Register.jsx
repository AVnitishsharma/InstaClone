import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.scss';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration Successful');
      } else {
        alert(data.message || 'Registration failed');
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
        <p style={{ color: 'white', fontSize: '17px', fontWeight: '600', marginBottom: '15px', opacity: 0.9 }}>Sign up to see photos and videos from your friends.</p>
        
        <button className="google-btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '10px', borderRadius: '10px' }} onClick={() => alert('Google Register Clicked')}>
          <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="G" width="16" style={{ filter: 'brightness(0) invert(1)' }} />
          Log in with Google
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          
          <p style={{ color: 'white', fontSize: '11px', margin: '10px 0', opacity: 0.8 }}>
            People who use our service may have uploaded your contact information to Instagram.
          </p>
          
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>

      <div className="switch-box">
        Have an account? <Link to="/login">Log in</Link>
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

export default Register;