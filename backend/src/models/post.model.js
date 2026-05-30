import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Caaption is required"],
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  image: {
    url: {
      type: String,
      required: [true, "Image URL is required"],
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
