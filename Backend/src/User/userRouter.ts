import express from "express";
import { createUser, allUser, loginUser, getUserByID } from "./userController";
const userRouter = express.Router();
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", allUser);
userRouter.get("/:id/:name", getUserByID);

export default userRouter;
