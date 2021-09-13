// Nanti akan berisi fungsi untuk generate token, verify token dan refresh token
const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
  VERIFICATION_SECRET,
  RESET_SECRET,
} = process.env;

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );
};

const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json("You are not authenticated");

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err) return res.status(403).json("Invalid token");

    req.user = payload;
    next();
  });
};

// Generate new access token when it's expired by using the refresh token
const generateNewAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .json("Refresh token does not exist! please login again");

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, payload) => {
    if (err) return res.status(403).json("Refresh token invalid");
    const data = { _id: payload.id, isAdmin: payload.isAdmin };

    const newAccessToken = generateAccessToken(data);

    res.cookie("accessToken", newAccessToken, {
      expires: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes on cookies
      secure: NODE_ENV != "development" ? true : false,
      sameSite: true,
    });

    res.cookie("uid", String(data._id), {
      expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000), // 3 days
      secure: NODE_ENV != "development" ? true : false,
      sameSite: true,
    });

    return res.status(200).json(newAccessToken);
  });
};

const generateEmailToken = (email) => {
  return jwt.sign({ email }, VERIFICATION_SECRET, { expiresIn: "24h" });
};

const generateResetToken = (email) => {
  return jwt.sign({ email }, RESET_SECRET, { expiresIn: "1h" });
};

const verifyEmailAddress = async (token) => {
  return jwt.verify(token, VERIFICATION_SECRET, async (err, payload) => {
    try {
      return payload;
    } catch {
      return err;
    }
  });
};

const verifyResetToken = async (token) => {
  return jwt.verify(token, RESET_SECRET, async (err, payload) => {
    try {
      return payload;
    } catch {
      return err;
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  generateNewAccessToken,
  generateEmailToken,
  verifyEmailAddress,
  generateResetToken,
  verifyResetToken,
};
