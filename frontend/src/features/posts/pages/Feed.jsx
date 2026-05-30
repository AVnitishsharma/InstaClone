import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import '../styles/post.scss';

const Feed = () => {
    const { posts, loading, error, fetchPosts } = usePosts();

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="post-feature">
            <nav className="navbar">
                <Link to="/" className="logo">Instagram</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/create">Create</Link>
                    <Link to="/login">Logout</Link>
                </div>
            </nav>

            <div className="feed-container">
                {loading && <p style={{ textAlign: 'center' }}>Loading posts...</p>}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                {!loading && posts.length === 0 && (
                    <p style={{ textAlign: 'center' }}>No posts yet. Be the first to post!</p>
                )}

                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <div className="post-header">
                            <div className="avatar">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.username || 'user'}`} alt="avatar" />
                            </div>
                            <span className="username">{post.author?.username || 'anonymous'}</span>
                        </div>

                        <img src={post.image?.url} alt="post" className="post-image" />

                        <div className="post-content">
                            <div className="actions">
                                <span>❤️</span>
                                <span>💬</span>
                                <span>✈️</span>
                            </div>
                            <div className="likes">1,234 likes</div>
                            <div className="caption">
                                <span>{post.author?.username || 'anonymous'}</span>
                                {post.caption}
                            </div>
                            <div className="timestamp">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
