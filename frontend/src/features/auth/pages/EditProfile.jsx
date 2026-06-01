import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile, setUser } from '../state/auth.slice';
import Sidebar from '../../shared/Sidebar';
import '../styles/profile.scss';

const EditProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        website: user?.website || '',
        bio: user?.bio || '',
        email: user?.email || '',
        gender: user?.gender || ''
    });

    const [preview, setPreview] = useState(user?.profilePic?.url || '');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (file) data.append('profilePic', file);

        const resultAction = await dispatch(updateUserProfile(data));
        if (updateUserProfile.fulfilled.match(resultAction)) {
            navigate(`/profile/${formData.username}`);
        }
        setLoading(false);
    };

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="edit-profile-container">
                <div className="edit-card">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-row profile-pic-row">
                            <div className="pic-preview">
                                <img src={preview || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt="preview" />
                            </div>
                            <div className="pic-action">
                                <span className="current-username">{user?.username}</span>
                                <label htmlFor="pic-upload" className="change-pic-btn">Change profile photo</label>
                                <input id="pic-upload" type="file" hidden onChange={handleFileChange} accept="image/*" />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Name</label>
                            <div className="input-group">
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                                <p className="help-text">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Username</label>
                            <div className="input-group">
                                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Website</label>
                            <div className="input-group">
                                <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Bio</label>
                            <div className="input-group">
                                <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" maxLength="150" />
                                <p className="char-count">{formData.bio.length} / 150</p>
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Email</label>
                            <div className="input-group">
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Gender</label>
                            <div className="input-group">
                                <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Saving...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
