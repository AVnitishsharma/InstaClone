import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    searchUsers,
    getSearchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
    clearAllSearchHistory,
    setSearchOpen,
    clearResults
} from '../state/search.slice';
import '../styles/search.scss';

const SearchOverlay = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { results, history, loading, isOpen } = useSelector((state) => state.search);

    useEffect(() => {
        if (isOpen) {
            dispatch(getSearchHistory());
        }
    }, [isOpen, dispatch]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                dispatch(searchUsers(query));
            } else {
                dispatch(clearResults());
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query, dispatch]);

    const handleUserClick = (user) => {
        dispatch(addToSearchHistory(user._id));
        dispatch(setSearchOpen(false));
    };

    const handleRemoveHistory = (e, userId) => {
        e.stopPropagation();
        dispatch(removeFromSearchHistory(userId));
    };

    const handleClearAll = () => {
        dispatch(clearAllSearchHistory());
    };

    if (!isOpen) return null;

    return (
        <div className={`search-overlay ${isOpen ? 'active' : ''}`}>
            <div className="search-container">
                <div className="search-header">
                    <h2>Search</h2>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {query && (
                            <button className="clear-btn" onClick={() => setQuery('')}>
                                <i className='bx bxs-x-circle'></i>
                            </button>
                        )}
                    </div>
                </div>

                <div className="search-content">
                    {query.trim() === '' ? (
                        <div className="search-history">
                            <div className="history-header">
                                <h3>Recent</h3>
                                {history.length > 0 && (
                                    <button className="clear-all-btn" onClick={handleClearAll}>
                                        Clear all
                                    </button>
                                )}
                            </div>
                            {history.length === 0 ? (
                                <div className="no-recent">No recent searches.</div>
                            ) : (
                                <ul className="history-list">
                                    {history.map((user) => (
                                        <li key={user?._id} className="history-item" onClick={() => user && handleUserClick(user)}>
                                            {user && (
                                                <>
                                                    <div className="user-info">
                                                        <img src={user.profilePic || 'https://via.placeholder.com/150'} alt={user.username} />
                                                        <div className="user-details">
                                                            <span className="username">{user.username}</span>
                                                            <span className="name">{user.name || user.username}</span>
                                                        </div>
                                                    </div>
                                                    <button className="remove-btn" onClick={(e) => handleRemoveHistory(e, user._id)}>
                                                        <i className='bx bx-x'></i>
                                                    </button>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className="search-results">
                            {loading ? (
                                <div className="loading">Searching...</div>
                            ) : results.length === 0 ? (
                                <div className="no-results">No results found.</div>
                            ) : (
                                <ul className="results-list">
                                    {results.map((user) => (
                                        <li key={user._id} className="result-item" onClick={() => handleUserClick(user)}>
                                            <img src={user.profilePic || 'https://via.placeholder.com/150'} alt={user.username} />
                                            <div className="user-details">
                                                <span className="username">{user.username}</span>
                                                <span className="name">{user.name || user.username}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="overlay-backdrop" onClick={() => dispatch(setSearchOpen(false))}></div>
        </div>
    );
};

export default SearchOverlay;
