import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./User/userRouter";
import verifyAuthToken from "./middleware/verifyJwtToken";
import postRouter from "./Post/postRouter";
interface newRequest extends Request {
  id?: string; // Adjust the type of 'user' as per your application's requirements
}
const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send({ message: "Message from home route." });
});

app.get("/protected", verifyAuthToken, (req: newRequest, res: Response) => {
  const { id } = req; 
  res.send({ id });
});
app.use('/post',postRouter)
app.use("/user", userRouter);
app.use(globalErrorHandler);
export default app;
