import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/auth.slice';
import postReducer from '../features/posts/state/post.slice';
import searchReducer from '../features/search/state/search.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        search: searchReducer,
    },
});
