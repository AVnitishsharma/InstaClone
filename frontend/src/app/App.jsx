import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../features/auth/pages/Register.jsx';
import Login from '../features/auth/pages/Login.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1>welcome to the app</h1>} />
      </Routes>
    </Router>
  );
};

export default App;