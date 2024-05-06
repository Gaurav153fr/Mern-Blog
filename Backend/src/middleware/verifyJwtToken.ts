import { Request, NextFunction, Response } from "express";
import createHttpError from "http-errors";
import jsonWebToken from "jsonwebtoken";
interface k extends Request {
  id?: any; // Adjust the type of 'user' as per your application's requirements
}
function verifyAuthToken(req: k, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  const body = req.body;
  const params = req.params;
  if (token == null) {
    const error = createHttpError(400, "Login and give token");
    return next(error);
  }
  jsonWebToken.verify(token, "hello", (err: any, user: any) => {
    if (err) {
      const error = createHttpError(403, "Session expired please login again");
      return next(error);
    }
    req.id = user.sub;
    req.body = body;
    req.params = params;
    console.log(user.sub);
    next();
  });
}
export default verifyAuthToken;
