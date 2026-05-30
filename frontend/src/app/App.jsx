import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../features/auth/pages/Register.jsx';
import Login from '../features/auth/pages/Login.jsx';
import Feed from '../features/posts/pages/Feed.jsx';
import CreatePost from '../features/posts/pages/CreatePost.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default App;