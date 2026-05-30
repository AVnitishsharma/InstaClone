import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import '../styles/post.scss';

const CreatePost = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const { handleCreatePost, loading, error } = usePosts();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Local preview ke liye URL create karna
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('image', image); // Backend mein multer 'image' field expect kar raha hai

        try {
            await handleCreatePost(formData);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

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

            <div className="create-post-container">
                <h1>Create New Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="upload-area">
                        {preview ? (
                            <img src={preview} alt="preview" className="preview-img" />
                        ) : (
                            <p>Select an image to preview</p>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        className="caption-input"
                        onChange={handleImageChange}
                        required
                    />

                    <textarea
                        className="caption-input"
                        placeholder="Write a caption..."
                        rows="4"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    ></textarea>

                    {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Posting...' : 'Share'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
