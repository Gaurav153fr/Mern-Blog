import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import jsonWebToken from "jsonwebtoken";
import { User } from "./userType";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "please fill all fields");
    return next(error);
  }

  const user = await userModel.findOne({ email });

  if (user) {
    const error = createHttpError(400, "user already exist");
    return next(error);
  }
  const newUser: User = await userModel.create({ name, email, password });
  const token = generateToken(newUser);

  res.send({ id:newUser._id,name: name, email: email, token: token });
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = createHttpError(400, "please fill all fields");
    return next(error);
  }

  const user: User | null = await userModel.findOne({ email });
  if (user == null) {
    const error = createHttpError(404, "No user with this email.");
    return next(error);
  }
  if (user.password !== password) {
    const error = createHttpError(403, "Wrong password.");
    return next(error);
  }
  const token = generateToken(user);

  res.send({id:user._id ,name: user.name, email: user.email, token: token });
};

function generateToken(user: User) {
  const token = jsonWebToken.sign({ sub: user._id }, "hello", {
    expiresIn: "7d",
  });
  return token;
}

const allUser = async (req: Request, res: Response, next: NextFunction) => {
  const Alluser = await userModel.find();
  res.send(Alluser);
};
const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    const error = createHttpError(404, "Please enter valid user");
    return next(error);
  }
  const user = await userModel.findById(id);
  res.send(user);
};
export { createUser, allUser, loginUser, getUserByID };
