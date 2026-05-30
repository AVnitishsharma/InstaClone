import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';

const Login = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const navigate = useNavigate();
  const { handleLogin, loading, error, token } = useAuth();
  const { identifier, password } = formData;

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
    handleLogin({ identifier, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-box">
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="identifier" 
                placeholder="Phone number, username, or email" 
                value={identifier} 
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
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="divider">OR</div>

            <button className="google-btn" onClick={() => alert('Google Login Clicked')}>
              <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="G" width="16" />
              Log in with Google
            </button>

            <p className="forgot-password">Forgot password?</p>
          </div>

          <div className="switch-box">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>

          <div className="get-app">
            <p>Get the app.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <img src="https://imgs.search.brave.com/BarvjVuBAqiiY-FV_blwPG5GYR9NLiwKoxvTTI8vuhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/YXBlLmNvbS93cC1j/b250ZW50L3BuZ19s/b2dvX3ZlY3Rvci9k/b3dubG9hZC1vbi10/aGUtYXBwLXN0b3Jl/LWxvZ28ucG5n" alt="App Store" height="40" />
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fandroid%2F67015-play-google-app-store-android-free-transparent-image-hd.png&f=1&nofb=1&ipt=1df1142a705c7337793ad7f06b77ec6394ac3e40ad4f71a80af3d594c1c45001" alt="Google Play" height="40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;