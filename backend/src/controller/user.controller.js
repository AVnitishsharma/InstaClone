import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

async function sendToken(user, res) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  return token;
}

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new userModel({ username, email, password });
    await user.save();

    const token = await sendToken(user, res);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'register error' });
  }
};

export const loginController = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await userModel.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or email' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = await sendToken(user, res);
    res.status(200).json({ message: 'Login successful', token });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'login error' });
  }
}