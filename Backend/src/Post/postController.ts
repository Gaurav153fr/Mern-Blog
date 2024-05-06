import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import postModel from "./postModel";
import Post from "./postType";
import userModel from "../User/userModel";
import { User } from "../User/userType";
interface newRequest extends Request {
  id?: any; // Adjust the type of 'user' as per your application's requirements
}
const createPost = async (
  req: newRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, story, labels, authorName } = req.body;
  const { id } = req;

  if (!title || !story || !id|| !authorName) {
    const error = createHttpError(400, "please fill all fields");
    return next(error);
  }
  
  const post: Post = await postModel.create({
    title,
    story,
    author: id,
    authorName,
    likes: [],
    label:labels,
  });
  await userModel.findByIdAndUpdate(id, { $push: { posts: post._id } });
  res.send({ post: post._id });
};

const getPostByID = async (
  req: newRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    const error = createHttpError(400, "please fill all fields");
    return next(error);
  }
  try {
    const post: Post | null = await postModel.findById(id);
    if (post == null) {
      const error = createHttpError(404, "Post doesn't exist.");
      return next(error);
    }
    res.send(post);
  } catch {
    const error = createHttpError(404, "No post found.");
    return next(error);
  }
};
const getAllPost = async (
  req: newRequest,
  res: Response,
  next: NextFunction
) => {
  const { label } = req.query;

  if (!label) {
    const post: Post[] | null = await postModel.find();
    if (post == null) {
      const error = createHttpError(404, "Post doesn't exist.");
      return next(error);
    }
    res.send(post);
  } else if (label) {
    const post: Post[] | null = await postModel.find({
      label: { $all: label.toString().split(",") },
    });
    if (post == null) {
      const error = createHttpError(404, "Post doesn't exist.");
      return next(error);
    }
    res.send(post);
  }
};

const likePost = async (req: newRequest, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { unLike } = req.body;
  const { id } = req;
  if (!id || !postId) {
    const error = createHttpError(400, "please fill all fields");
    return next(error);
  }
  if (unLike) {
    try {
      const post: Post | null = await postModel.findByIdAndUpdate(postId, {
        $pull: { likes: id },
      });
      if (post == null) {
        const error = createHttpError(404, "Post doesn't exist.");
        return next(error);
      }
      res.send(post);
    } catch {
      const error = createHttpError(400, "Cannot unlike this post.");
      return next(error);
    }
  } else {
    const post: Post | null = await postModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: id },
      },
      { new: true }
    );
    if (post == null) {
      const error = createHttpError(404, "Post doesn't exist.");
      return next(error);
    }
    res.send(post);
  }
};
export { createPost, getPostByID, getAllPost, likePost };
