const router = require("express").Router();

const {
  register,
  login,
  getUserInfo,
} = require("../controllers/AuthController");
const { verifyToken, generateNewAccessToken } = require("../middlewares/Token");

router.post("/register", register);
router.post("/login", login);
router.get("/users", [verifyToken], getUserInfo);
router.post("/refresh", generateNewAccessToken);

module.exports = router;
