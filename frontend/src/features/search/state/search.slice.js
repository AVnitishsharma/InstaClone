import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

export const searchUsers = createAsyncThunk(
    'search/searchUsers',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/search?query=${query}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getSearchHistory = createAsyncThunk(
    'search/getSearchHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/search/history`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addToSearchHistory = createAsyncThunk(
    'search/addToSearchHistory',
    async (searchedUserId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/search/history`, { searchedUserId }, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeFromSearchHistory = createAsyncThunk(
    'search/removeFromSearchHistory',
    async (searchedUserId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/search/history/${searchedUserId}`, { withCredentials: true });
            return { searchedUserId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const clearAllSearchHistory = createAsyncThunk(
    'search/clearAllSearchHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/search/history/clear-all`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        history: [],
        loading: false,
        error: null,
        isOpen: false,
    },
    reducers: {
        toggleSearch: (state) => {
            state.isOpen = !state.isOpen;
        },
        setSearchOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        clearResults: (state) => {
            state.results = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSearchHistory.fulfilled, (state, action) => {
                state.history = action.payload;
            })
            .addCase(removeFromSearchHistory.fulfilled, (state, action) => {
                state.history = state.history.filter(user => user._id !== action.payload.searchedUserId);
            })
            .addCase(clearAllSearchHistory.fulfilled, (state) => {
                state.history = [];
            });
    }
});

export const { toggleSearch, setSearchOpen, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
