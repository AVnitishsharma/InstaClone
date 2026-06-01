import express from 'express';
import multer from 'multer';
import {
    searchUsers,
    addToSearchHistory,
    getSearchHistory,
    removeFromSearchHistory,
    clearAllSearchHistory,
    getUserProfile,
    updateUserProfile
} from '../controller/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const upload = multer({ storage: multer.memoryStorage() });
const userRouter = express.Router();

userRouter.get('/search', searchUsers);
userRouter.post('/search/history', protect, addToSearchHistory);
userRouter.get('/search/history', protect, getSearchHistory);
userRouter.delete('/search/history/clear-all', protect, clearAllSearchHistory);
userRouter.delete('/search/history/:searchedUserId', protect, removeFromSearchHistory);

userRouter.get('/profile/:username', getUserProfile);
userRouter.put('/profile/update', protect, upload.single('profilePic'), updateUserProfile);

export default userRouter;
