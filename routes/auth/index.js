import { Router } from "express";
const authRouter = Router();
import { login, register } from "../../controllers/auth/authController.js";
import { genNewAccessToken } from "../../middleware/token.js";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", genNewAccessToken);

export default authRouter;
