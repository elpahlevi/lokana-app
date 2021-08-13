const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/Token");

const register = async (req, res) => {
  const { fullName, email, password, institution, usagePurpose } = req.body;

  const emailExist = await Users.findOne({ email: email });
  if (emailExist) return res.status(409).json("Email already registered");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const createUser = new Users({
    fullName,
    email,
    password: hashPassword,
    institution,
    usagePurpose,
  });

  try {
    await createUser.save();
    res.status(201).json("Thank you for registering");
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email: email });
  if (!user) return res.status(400).json("Incorrect email address or password");

  const pwd = await bcrypt.compare(password, user.password);
  if (!pwd) return res.status(400).json("Incorrect email address or password");

  try {
    // Generate Access & Refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes
      secure: false,
      sameSite: true,
    });
    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000), // 3 days
      secure: false,
      sameSite: true,
    });
    res.cookie("uid", String(user._id), {
      expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000), // 3 days
      secure: false,
      sameSite: true,
    });

    return res.status(200).json("Success");
  } catch (err) {
    return res.status(400).json("Bad request");
  }
};

const getUserInfo = async (req, res) => {
  const { id } = req.user;
  Users.findById(id, (err, docs) => {
    if (err) return res.status(500).send(err);
    const { fullName, email, institution, usagePurpose } = docs;
    res.status(200).json({ fullName, email, institution, usagePurpose });
  });
};

module.exports = { register, login, getUserInfo };
