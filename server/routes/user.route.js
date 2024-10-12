import express from "express";
import { deleteUser, getUsers, updateUser, profilePosts, savePost, getNotificationNumber } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRoute = express.Router();

userRoute.get("/", getUsers);
userRoute.put("/:id", verifyToken, updateUser);
userRoute.delete("/:id", verifyToken, deleteUser);
userRoute.get("/profile-posts", verifyToken, profilePosts)
userRoute.post("/save/:id", verifyToken, savePost)
userRoute.get("/notification", verifyToken, getNotificationNumber);

export default userRoute;