import express from "express"
const postRouter = express.Router();
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

import { createPost, getPosts, getPostById, likePost } from "../controller/post.controller.js";

postRouter.post("/create", upload.single('image'), createPost);
postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
// postRouter.put("/:id", updatePost);
// postRouter.delete("/:id", deletePost);

postRouter.post("/:id/like", likePost);

export default postRouter;