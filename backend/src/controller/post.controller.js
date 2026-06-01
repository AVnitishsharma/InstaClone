import PostModel from "../models/post.model.js";
import ImageKit from "imagekit";
import jwt from "jsonwebtoken";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const createPost = async (req, res) => {
  const { caption } = req.body;
  const file = req.file;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!caption) {
    return res.status(400).json({ message: "Caption is required" });
  }

  if (!file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const uploadResponse = await imagekit.upload({
      file: file.buffer, // multer memory storage se buffer milta hai
      fileName: `${Date.now()}-${file.originalname}`,
    });

    const post = new PostModel({ 
      caption,
      image: {
        url: uploadResponse.url,
        fileId: uploadResponse.fileId
      },
      author: decodedToken.id, // Ab hum req.user use kar sakte hain (protect middleware se)
    });

    await post.save();
    res.status(201).json({
      message: "post created successfully",
      post,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("author", "username profilePic").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id).populate("author", "username profilePic");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ message: "Post liked successfully", likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: "Error liking post" });
  }
};