import express from 'express';
const authRouter = express.Router();

import { registerController, loginController, getCurrentUser } from '../controller/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/me', protect, getCurrentUser);

export default authRouter;