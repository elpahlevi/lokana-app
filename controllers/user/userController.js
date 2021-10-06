import bcryptjs from "bcryptjs";
import {
  sendEmailVerification,
  sendResetPasswordEmail,
} from "../../config/mail.js";
import {
  genEmailToken,
  genResetToken,
  verifyEmailToken,
  verifyResetToken,
} from "../../middleware/token.js";
import userModel from "../../models/users/users.model.js";
const { genSalt, hash } = bcryptjs;

// Get user infomation
const userInfo = async (req, res) => {
  const { id } = req.user;
  userModel.findById(id, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({
      name: data.name,
      email: data.email,
      institution: data.institution,
      purpose: data.purpose,
    });
  });
};

// Email verification
const emailVerification = async (req, res) => {
  const { token } = req.query;
  const verify = await verifyEmailToken(token);
  if (!verify) return res.status(401).send("Token expired!");

  const user = await userModel.findOne({ token });
  if (!user) return res.status(404).json("User not found");
  user.verified = true;
  user.token = "";
  user.save();
  return res.status(200).json("user verified");
};

// Send a new email verification if expired (not implemented yet)
const newEmailVerification = async (req, res) => {
  const { _id } = req.body;
  const user = await userModel.findById(_id);
  if (!user) return res.status(404).json("User not found");
  if (user.verified) return res.status(409).json("You are already verified");

  const token = genEmailToken(user.email);
  user.token = token;
  sendEmailVerification(user.name, user.email, token);
  user.save();
  return res.status(200).json("Email verification sent!");
};

// Send reset password email
const forgotPassword = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json("Sorry, you are not registered to our website");

  const token = genResetToken(user.email);
  user.token = token;
  user.save();
  sendResetPasswordEmail(user.email, user.name, token);
  return res.status(200).json("Reset password confirmation email sent!");
};

// Verify reset password token
const verifyForgotPassword = async (req, res) => {
  const { token } = req.query;
  const verify = await verifyResetToken(token);
  const user = await userModel.findOne({ token });

  if (verify && user) return res.status(200).json("Token verified");
  return res.status(401).json("Token expired");
};

// Create a new password
const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;

  const user = await userModel.findOne({ token });
  if (!user) return res.status(404).json("User not found");

  const salt = await genSalt(10);
  const hashPwd = await hash(newPassword, salt);
  user.password = hashPwd;
  user.token = "";
  user.save();
  return res.status(200).json("New password created");
};

export {
  userInfo,
  emailVerification,
  newEmailVerification,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
};
