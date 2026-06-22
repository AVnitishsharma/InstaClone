import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../features/auth/state/auth.slice.js';
import Register from '../features/auth/pages/Register.jsx';
import Login from '../features/auth/pages/Login.jsx';
import Feed from '../features/posts/pages/Feed.jsx';
import CreatePost from '../features/posts/pages/CreatePost.jsx';
import Profile from '../features/auth/pages/Profile.jsx';
import EditProfile from '../features/auth/pages/EditProfile.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;