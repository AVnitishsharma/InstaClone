import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../shared/sidebar.scss';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <Link to="/" className="logo">
                    <i className='bx bxl-instagram'></i>
                    <span className="logo-full">Instagram</span>
                </Link>
            </div>
            <div className="sidebar-nav">
                <NavLink to="/" className="sidebar-item">
                    <i className='bx bx-home-alt-2 nav-icon'></i>
                    <span className="nav-text">Home</span>
                </NavLink>
                <NavLink to="/search" className="sidebar-item">
                    <i className='bx bx-search nav-icon'></i>
                    <span className="nav-text">Search</span>
                </NavLink>
                <NavLink to="/explore" className="sidebar-item">
                    <i className='bx bx-compass nav-icon'></i>
                    <span className="nav-text">Explore</span>
                </NavLink>
                <NavLink to="/reels" className="sidebar-item">
                    <i className='bx bx-movie-play nav-icon'></i>
                    <span className="nav-text">Reels</span>
                </NavLink>
                <NavLink to="/messages" className="sidebar-item">
                    <i className='bx bx-paper-plane nav-icon'></i>
                    <span className="nav-text">Messages</span>
                </NavLink>
                <NavLink to="/notifications" className="sidebar-item">
                    <i className='bx bx-heart nav-icon'></i>
                    <span className="nav-text">Notifications</span>
                </NavLink>
                <NavLink to="/create" className="sidebar-item">
                    <i className='bx bx-plus nav-icon'></i>
                    <span className="nav-text">Create</span>
                </NavLink>
                <NavLink to="/profile" className="sidebar-item">
                    <i className='bx bx-user nav-icon'></i>
                    <span className="nav-text">Profile</span>
                </NavLink>
            </div>
            <div className="sidebar-more">
                <Link to="/more" className="sidebar-item">
                    <i className='bx bx-menu nav-icon'></i>
                    <span className="nav-text">More</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;