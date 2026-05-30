import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({ 
  name: 'post',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
  },
});

export const { setPosts, setLoading, setError, addPost } = postSlice.actions;
export default postSlice.reducer;
