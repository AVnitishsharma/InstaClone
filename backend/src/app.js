import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
// const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

export default app;