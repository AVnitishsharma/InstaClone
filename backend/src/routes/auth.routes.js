import express from 'express';
const authRouter = express.Router();

import { registerController, loginController } from '../controller/user.controller.js';

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
// authRouter.getme('/me', );

export default authRouter;