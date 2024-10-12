import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost, addRating, getRating, updateRating, getLandingPagePosts } from "../controllers/post.controller.js";

const postRoute = express.Router();

postRoute.get("/", getPosts);
postRoute.get("/landing", getLandingPagePosts);
postRoute.get("/:id", getPost);
postRoute.post("/", verifyToken, addPost);
postRoute.put("/:id", verifyToken, updatePost);
postRoute.delete("/:id", verifyToken, deletePost);
postRoute.post("/:id/rating", verifyToken, addRating);
postRoute.get("/:id/rating", verifyToken, getRating);
postRoute.put("/:id/rating", verifyToken, updateRating);

export default postRoute;