import { Router } from "express";
const userRouter = Router();
import {
  userInfo,
  emailVerification,
  newEmailVerification,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
} from "../../controllers/user/userController.js";
import { verifyAccessToken } from "../../middleware/token.js";

userRouter.get("/", [verifyAccessToken], userInfo);
userRouter.get("/verification", emailVerification);
userRouter.post("/verification", newEmailVerification);
userRouter.post("/password/forgot", forgotPassword);
userRouter.get("/password/forgot", verifyForgotPassword);
userRouter.post("/password/reset", resetPassword);

export default userRouter;
