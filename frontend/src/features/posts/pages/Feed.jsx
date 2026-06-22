import React, { useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import Sidebar from '../../shared/Sidebar';
import '../styles/post.scss';

const Feed = () => {
    const { posts, loading, error, fetchPosts, fetchPostById, likePost } = usePosts();

    useEffect(() => {
        fetchPosts();
    }, []);

    

    return (
        
        <div className="main-layout">
            <Sidebar />
            <div className="feed-container">
                {loading && posts.length === 0 && (
                    [1, 2, 3].map((n) => (
                        <div key={n} className="post-card skeleton-card">
                            <div className="post-header">
                                <div className="avatar skeleton"></div>
                                <div className="username-skeleton skeleton"></div>
                            </div>
                            <div className="post-image skeleton"></div>
                            <div className="post-content">
                                <div className="likes-skeleton skeleton"></div>
                                <div className="caption-skeleton skeleton"></div>
                            </div>
                        </div>
                    ))
                )}

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

                        <img 
                            onClick={() => {
                                console.log("Fetching post with ID:", post._id);
                                if (typeof fetchPostById === 'function') {
                                    fetchPostById(post._id);
                                } else {
                                    console.warn("fetchPostById function is not defined in usePosts hook");
                                }
                            }} 
                            src={post.image?.url} alt="post" 
                            className="post-image" 
                        />

                        <div className="post-content">
                            <div className="actions">
                                <span onClick={() => likePost(post._id)}>
                                    <i className='bx bx-heart nav-icon'></i>
                                </span>
                                <span><i className='bx bx-message-rounded'></i></span>
                                <span><i className='bx bx-paper-plane nav-icon'></i></span>
                            </div>
                            <div className="likes">{post.likes} likes</div>
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
            <div className="follo-suggestions">
                followers Suggestions
            </div>
        </div>
    );
};

export default Feed;
