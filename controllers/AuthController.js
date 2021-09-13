const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const {
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
  verifyEmailAddress,
  generateResetToken,
  verifyResetToken,
} = require("../middlewares/Token");
const nodemailer = require("../middlewares/Nodemailer");

const { NODE_ENV } = process.env;

const register = async (req, res) => {
  const { fullName, email, password, institution, usagePurpose } = req.body;

  const emailExist = await Users.findOne({ email: email });
  if (emailExist) return res.status(409).json("Email already registered");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const verificationToken = generateEmailToken(email);

  const createUser = new Users({
    fullName,
    email,
    password: hashPassword,
    institution,
    usagePurpose,
    verificationToken,
  });

  try {
    await createUser.save();
    nodemailer.sendVerificationEmail(fullName, email, verificationToken);
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
      secure: NODE_ENV != "development" ? true : false,
      sameSite: true,
    });
    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000), // 3 days
      secure: NODE_ENV != "development" ? true : false,
      sameSite: true,
    });
    res.cookie("uid", String(user._id), {
      expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000), // 3 days
      secure: NODE_ENV != "development" ? true : false,
      sameSite: true,
    });

    return res.status(200).json("Success");
  } catch (err) {
    return res.status(400).json("Bad request");
  }
};

const emailVerification = async (req, res) => {
  const { token } = req.query;
  const verify = await verifyEmailAddress(token);
  // token expired
  if (!verify) return res.status(401).send("Token expired");

  const user = await Users.findOne({
    verificationToken: token,
  });
  if (!user) return res.status(404).json("User not found");
  // change state to true
  user.verified = true;
  user.verificationToken = "";
  // save the change
  user.save();
  return res.status(200).json("User verified!");
};

const resendEmailVerification = async (req, res) => {
  const { _id } = req.body;
  const user = await Users.findById(_id);
  if (!user) return res.status(404).json("User not found");
  user.verificationToken = generateEmailToken(user.email);
  nodemailer.sendVerificationEmail(
    user.fullName,
    user.email,
    user.verificationToken
  );
  user.save();
  res.status(200).json("Email verification sent!");
};

// Send reset password email
const forgotPassword = async (req, res) => {
  const user = await Users.findOne({
    email: req.body.email,
  });
  if (!user)
    return res.status(404).json("Sorry, you are not registered to our website");
  user.resetToken = generateResetToken(user.email);
  user.save();
  nodemailer.sendResetPassword(user.email, user.fullName, user.resetToken);
  return res.status(200).json("Reset password sent");
};

// Verify the validity of reset password's token
const verifyResetPasswordToken = async (req, res) => {
  const { token } = req.query;
  const verify = await verifyResetToken(token);
  const user = await Users.findOne({
    resetToken: token,
  });
  if (verify && user) return res.status(200).json("Token verified");

  return res.status(401).json("Token expired");
};

// Send a new password
const resetPassword = async (req, res) => {
  const { newPassword, resetToken } = req.body;

  const user = await Users.findOne({
    resetToken,
  });
  if (!user) return res.status(404).json("User not found");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashPassword;
  user.resetToken = "";
  user.save();
  return res.status(200).json("New password created");
};

const getUserInfo = async (req, res) => {
  const { id } = req.user;
  Users.findById(id, (err, docs) => {
    if (err) return res.status(500).send(err);
    const { fullName, email, institution, usagePurpose } = docs;
    res.status(200).json({ fullName, email, institution, usagePurpose });
  });
};

module.exports = {
  register,
  login,
  emailVerification,
  resendEmailVerification,
  forgotPassword,
  verifyResetPasswordToken,
  resetPassword,
  getUserInfo,
};
