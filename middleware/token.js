import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
const {
  NODE_ENV,
  ACCESS_SECRET,
  REFRESH_SECRET,
  VERIFICATION_SECRET,
  RESET_SECRET,
} = process.env;

// Generate access token
const genAccessToken = (user) => {
  return sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    ACCESS_SECRET,
    { expiresIn: "1m" },
  );
};

// Generate refresh token
const genRefreshToken = (user) => {
  return sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    REFRESH_SECRET,
    { expiresIn: "3d" },
  );
};

// Access token verification
const verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json("You are not authenticated");

  verify(accessToken, ACCESS_SECRET, async (err, payload) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = payload;
    next();
  });
};

// When access token expired, generate a new one
const genNewAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(401).json("Credential not found!");

  verify(refreshToken, REFRESH_SECRET, async (err, payload) => {
    if (err) return res.status(403).json("Invalid refresh token");
    const data = { _id: payload.id, isAdmin: payload.isAdmin };
    const newAccessToken = genAccessToken(data);

    res.cookie("accessToken", newAccessToken, {
      expires: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes on cookies
      secure: NODE_ENV != "development" ? true : false,
      sameSite: true,
    });

    return res.status(200).json(newAccessToken);
  });
};

// Generate email verification token
const genEmailToken = (email) => {
  return sign({ email }, VERIFICATION_SECRET, { expiresIn: "24h" });
};
// Generate password reset token
const genResetToken = (email) => {
  return sign({ email }, RESET_SECRET, { expiresIn: "1h" });
};
// Email token verification
const verifyEmailToken = async (token) => {
  return verify(token, VERIFICATION_SECRET, async (err, payload) => {
    try {
      return payload;
    } catch {
      return err;
    }
  });
};
// Reset password token verification
const verifyResetToken = async (token) => {
  return verify(token, RESET_SECRET, async (err, payload) => {
    try {
      return payload;
    } catch {
      return err;
    }
  });
};

export {
  genAccessToken,
  genRefreshToken,
  verifyAccessToken,
  genNewAccessToken,
  genEmailToken,
  genResetToken,
  verifyEmailToken,
  verifyResetToken,
};
