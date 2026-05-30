import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const { handleRegister, loading, error, token } = useAuth();
  const { username, email, password } = formData;

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the handleRegister function from the useAuth hook
    handleRegister({ username, email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-box">
            <h2>InstaClone</h2>
            <p style={{ color: 'white', fontSize: '17px', fontWeight: '600', marginBottom: '15px', opacity: 0.9 }}>Sign up to see photos and videos from your friends.</p>

            <button className="google-btn secondary" onClick={() => alert('Google Register Clicked')}>
              <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="G" width="16" style={{ filter: 'brightness(0) invert(1)' }} />
              Sign up with Google
            </button>

            <div className="divider">OR</div>

            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                value={username} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={password} 
                onChange={handleChange} 
                required 
              />

              <p style={{ color: 'white', fontSize: '11px', margin: '10px 0', opacity: 0.8 }}>
                People who use our service may have uploaded your contact information to Instagram.
              </p>

              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
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