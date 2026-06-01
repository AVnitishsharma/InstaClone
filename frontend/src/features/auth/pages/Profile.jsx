import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../state/auth.slice';
import Sidebar from '../../shared/Sidebar';
import '../styles/profile.scss';

const Profile = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, profilePosts, loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserProfile(username));
    }, [username, dispatch]);

    if (loading) return <div className="loading-container">Loading...</div>;
    if (!profile) return <div className="error-container">User not found</div>;

    const isOwnProfile = user?.username === profile.username;

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="profile-container">
                <header className="profile-header">
                    <div className="profile-image">
                        <img
                            src={profile.profilePic?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                            alt={profile.username}
                        />
                    </div>

                    <div className="profile-info">
                        <div className="info-top">
                            <h2 className="username">{profile.username}</h2>
                            {isOwnProfile ? (
                                <div className="action-buttons">
                                    <Link to="/profile/edit" className="edit-btn">Edit Profile</Link>
                                    <button className="settings-btn"><i className='bx bx-cog'></i></button>
                                </div>
                            ) : (
                                <div className="action-buttons">
                                    <button className="follow-btn">Follow</button>
                                    <button className="message-btn">Message</button>
                                </div>
                            )}
                        </div>

                        <div className="info-stats">
                            <div className="stat-item"><span className="count">{profilePosts.length}</span> posts</div>
                            <div className="stat-item"><span className="count">{profile.followers?.length || 0}</span> followers</div>
                            <div className="stat-item"><span className="count">{profile.following?.length || 0}</span> following</div>
                        </div>

                        <div className="info-bio">
                            <span className="full-name">{profile.name || profile.username}</span>
                            <p className="bio-text">{profile.bio}</p>
                            {profile.website && (
                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="website">
                                    <i className='bx bx-link'></i> {profile.website.replace(/^https?:\/\//, '')}
                                </a>
                            )}
                        </div>
                    </div>
                </header>

                <div className="profile-content">
                    <div className="tabs">
                        <div className="tab active"><i className='bx bx-grid'></i> POSTS</div>
                        <div className="tab"><i className='bx bx-bookmark'></i> SAVED</div>
                        <div className="tab"><i className='bx bx-user-pin'></i> TAGGED</div>
                    </div>

                    <div className="posts-grid">
                        {profilePosts.map((post) => (
                            <div key={post._id} className="grid-item">
                                <img src={post.image?.url} alt="post" />
                                <div className="item-overlay">
                                    <span><i className='bx bxs-heart'></i> {post.likes}</span>
                                    <span><i className='bx bxs-message-rounded'></i> 0</span>
                                </div>
                            </div>
                        ))}
                        {profilePosts.length === 0 && (
                            <div className="no-posts">
                                <div className="icon"><i className='bx bx-camera'></i></div>
                                <h3>No Posts Yet</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
