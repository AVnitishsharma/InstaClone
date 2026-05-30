import express from "express"
const postRouter = express.Router();
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

import { createPost, getPosts } from "../controller/post.controller.js";

postRouter.post("/create", upload.single('image'), createPost);
postRouter.get("/", getPosts);
// postRouter.get("/:id", getPost);
// postRouter.put("/:id", updatePost);
// postRouter.delete("/:id", deletePost);

export default postRouter;