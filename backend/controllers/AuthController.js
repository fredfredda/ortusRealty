import { getUserByEmail, updatePassword } from "../models/UserModel.js";
import { Resend } from "resend";
import {
  createToken,
  verifyToken,
} from "../utils/helpers/PasswordResetTokens.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;

const resend = new Resend(process.env.RESEND_API_KEY);

const isLoggedin = (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(200).json({ isLoggedIn: false });
    } else {
      return res.status(200).json({ isLoggedIn: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (user.error) return res.status(500).json({ error: user.error });
    if (user.length === 0)
      return res.status(404).json({ error: "User not found" });
    if (user[0].pswrd === "google")
      return res.status(403).json({ error: "User signed up with Google" });

    const tokenId = `${user[0].id}-${Date.now()}`;

    const token = createToken({ tokenId, email }, 5 * 60 * 1000); // expires in 5 minutes
    const resetUrl = `${process.env.FRONTEND_ENDPOINT}/reset-password/${tokenId}`;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset",
      html: `<strong>Click <a href=${resetUrl}>here</a> to reset your password</strong>`,
    });

    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ token, success: "Email sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const tokenId = req.params.tokenId;

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const verify = verifyToken(tokenId, token);

    if (verify.valid === false)
      return res.status(400).json({ error: verify.reason });

    const user = await getUserByEmail(verify.data.email);
    const userId = user[0].id;

    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
      if (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json({ error });
      }

      let modifyPassword = await updatePassword(userId, hashedPassword);
      if (modifyPassword.error)
        return res.status(500).json({ error: modifyPassword });

      return res.status(201).json({ success: "Password updated" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export { isLoggedin, sendEmail, resetPassword };