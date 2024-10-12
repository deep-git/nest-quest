import express from "express";
import { shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const testRoute = express.Router();

// When making a request for this endpoint, it will run the middleware first, make the verification. 
// If everything is correct, it will run next(), and then the shouldBeLoggedIn function can be run
testRoute.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);

export default testRoute;