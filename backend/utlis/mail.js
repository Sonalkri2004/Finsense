import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const { verify } = jwt;

const createTransporter = () => {
  if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
    throw new Error("Mail credentials are not set in environment variables.");
  }

  return nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
};

export const verifyUserEmail = async (fullName, userEmail, userName, token) => {
  const transporter = createTransporter();
  
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: userEmail,
      subject: `Hello ${fullName}, please verify your email`,
      html: `<p>Please verify your email by clicking the link: <a href="http://localhost:3000/verifyUserEmail/${userName}/${token}">Verify Email</a></p>`,
    });
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending verification email: ", error);
  }
};

export const sendResetEmail = async (email, emailToken) => {
  const transporter = createTransporter();

  try {
    const mailOptions = {
      from: process.env.MAIL_USERNAME, // Use the environment variable for the sender email
      to: email,
      subject: "Password Reset",
      text: `You are receiving this because you have requested a password reset. 
             Click the following link to reset your password: 
             http://localhost:3000/reset-password/${emailToken}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Reset email sent: ", info.response);
  } catch (error) {
    console.error("Error sending reset email: ", error);
  }
};

