import { createTransport } from "nodemailer";
const { EMAIL_USER, EMAIL_PASS } = process.env;

const from = '"Lokana" <admin@lokana.id>';
const transport = createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmailVerification = (name, email, token) => {
  transport
    .sendMail({
      from,
      to: email,
      subject: "Welcome to Lokana",
      html: `<div>
            <h2>Hello ${name}. Welcome to Lokana</h2>
            <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
            <p>The link is only available for 24 hours</p>
            <a href=https://www.lokana.tech/verification/${token}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

const sendResetPasswordEmail = (email, name, token) => {
  transport
    .sendMail({
      from,
      to: email,
      subject: "Reset Password Confirmation",
      html: `<div>
            <h2>Hello ${name}</h2>
            <p>You requested to reset your password</p>
            <p>Please click the link below to reset your password</p>
            <p>The link is only available for 1 hour</p>
            <a href=https://www.lokana.tech/reset-password/${token}>Click to reset your password</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

export { sendEmailVerification, sendResetPasswordEmail };
