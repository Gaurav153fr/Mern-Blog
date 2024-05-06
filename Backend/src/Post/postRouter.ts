import express from "express";
import verifyAuthToken from "../middleware/verifyJwtToken";
import {
  createPost,
  getAllPost,
  getPostByID,
  likePost,
} from "./postController";

const postRouter = express.Router();
postRouter.post("/new", verifyAuthToken, createPost);
postRouter.get("/:id", getPostByID);
postRouter.get("/", getAllPost);
postRouter.patch("/:postId", verifyAuthToken, likePost);
export default postRouter;
