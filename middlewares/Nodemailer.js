const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;

const from = '"Lokana" <admin@lokana.id>';
const transport = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

module.exports.sendVerificationEmail = (name, email, verificationToken) => {
  transport
    .sendMail({
      from,
      to: email,
      subject: "Welcome to Lokana",
      html: `<div>
              <h2>Hello ${name}. Welcome to Lokana</h2>
              <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
              <p>The link is only available for 24 hours</p>
              <a href=https://www.lokana.tech/verification/${verificationToken}> Click here</a>
            </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendResetPassword = (email, name, resetToken) => {
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
              <a href=https://www.lokana.tech/reset-password/${resetToken}>Click to reset your password</a>
            </div>`,
    })
    .catch((err) => console.log(err));
};
