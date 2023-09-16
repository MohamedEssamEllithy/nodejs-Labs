import express from "express";
import {
  addPost,
  deletePost,
  getAllPost,
  getSortPosts,
  updatePost,
} from "./post.controller.js";

const postRoutes = express.Router();

postRoutes.get("/allPost", getAllPost);
postRoutes.get("/sortPosts", getSortPosts);
postRoutes.post("/addPost", addPost);
postRoutes.patch("/updatePost/:id", updatePost);
postRoutes.delete("/deletePost/:id", deletePost);

export default postRoutes;
