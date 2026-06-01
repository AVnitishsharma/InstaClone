import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/profile/${username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/user/profile/update`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    profile: null,
    profilePosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.profile = null;
      state.profilePosts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.profilePosts = action.payload.posts;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (state.profile?._id === action.payload.user._id) {
          state.profile = action.payload.user;
        }
      });
  }
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;