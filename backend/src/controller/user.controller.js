import userModel from '../models/user.model.js';
import SearchHistoryModel from '../models/searchHistory.model.js';
import PostModel from '../models/post.model.js';
import jwt from 'jsonwebtoken';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

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

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(200).json([]);

  try {
    const users = await userModel.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } }
      ]
    }).select('username name profilePic').limit(20);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Search error' });
  }
};

export const addToSearchHistory = async (req, res) => {
  const { searchedUserId } = req.body;
  const userId = req.user._id;

  try {
    await SearchHistoryModel.findOneAndUpdate(
      { user: userId, searchedUser: searchedUserId },
      { createdAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Added to search history' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding to history' });
  }
};

export const getSearchHistory = async (req, res) => {
  const userId = req.user._id;

  try {
    const history = await SearchHistoryModel.find({ user: userId })
      .populate('searchedUser', 'username name profilePic')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(history.map(item => item.searchedUser));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching history' });
  }
};

export const removeFromSearchHistory = async (req, res) => {
  const { searchedUserId } = req.params;
  const userId = req.user._id;

  try {
    await SearchHistoryModel.findOneAndDelete({ user: userId, searchedUser: searchedUserId });
    res.status(200).json({ message: 'Removed from search history' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing from history' });
  }
};

export const clearAllSearchHistory = async (req, res) => {
  const userId = req.user._id;

  try {
    await SearchHistoryModel.deleteMany({ user: userId });
    res.status(200).json({ message: 'All search history cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error clearing history' });
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await userModel.findOne({ username }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await PostModel.find({ author: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ user, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, bio, website, gender, username, email } = req.body;
  const userId = req.user._id;
  const file = req.file;

  try {
    let updateData = { name, bio, website, gender, username, email };

    if (file) {
      const uploadResponse = await imagekit.upload({
        file: file.buffer,
        fileName: `profile-${userId}-${Date.now()}`
      });
      updateData.profilePic = {
        url: uploadResponse.url,
        fileId: uploadResponse.fileId
      };
    }

    const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};