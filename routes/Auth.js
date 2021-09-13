const router = require("express").Router();

const {
  register,
  login,
  getUserInfo,
  emailVerification,
  forgotPassword,
  verifyResetPasswordToken,
  resetPassword,
  resendEmailVerification,
} = require("../controllers/AuthController");
const { verifyToken, generateNewAccessToken } = require("../middlewares/Token");

router.post("/register", register);
router.post("/login", login);
router.get("/users", [verifyToken], getUserInfo);
router.post("/refresh", generateNewAccessToken);
router.get("/email/verification", emailVerification);
router.post("/email/verification", resendEmailVerification);
router.post("/password/forgot", forgotPassword);
router.get("/password/reset", verifyResetPasswordToken);
router.post("/password/reset", resetPassword);

module.exports = router;
