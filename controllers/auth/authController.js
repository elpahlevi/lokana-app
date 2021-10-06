import bcryptjs from "bcryptjs";
import userModel from "../../models/users/users.model.js";
import {
  genAccessToken,
  genRefreshToken,
  genEmailToken,
} from "../../middleware/token.js";
import { sendEmailVerification } from "../../config/mail.js";
const { genSalt, hash, compare } = bcryptjs;
const { NODE_ENV } = process.env;

const register = async (req, res) => {
  const { name, email, password, institution, purpose } = req.body;

  // Check email
  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) return res.status(409).json("Email already registered");

  // Password encryption
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  // Generate email verification token
  const token = genEmailToken(email);

  const createUser = new userModel({
    name,
    email,
    password: hashPassword,
    institution,
    purpose,
    token,
  });

  try {
    await createUser.save();
    sendEmailVerification(name, email, token);
    return res.status(201).json("User created");
  } catch (err) {
    return res.status(200).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).json("Incorrect email address or password");

  const pwd = await compare(password, user.password);
  if (!pwd) return res.status(400).json("Incorrect email address or password");

  try {
    const accessToken = genAccessToken(user);
    const refreshToken = genRefreshToken(user);
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

    return res.status(200).json("login success");
  } catch (err) {
    return res.status(400).json("Bad request");
  }
};

export { register, login };
