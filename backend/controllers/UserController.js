import {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
} from "../models/UserModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import getTimeWithTimeZone from "../utils/helpers/getTimeWithTimeZone.js";
import assignId from "../utils/helpers/assignId.js";
import qs from "qs";
import jwt from "jsonwebtoken";

const saltRounds = 2;

const getProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await getUserById(userId);
    if (user.error) return res.status(500).json({ error: user });
    return res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
  }
};

const googleOAuthHandler = async (req, res) => {
  try {
    const { code } = req.query;
    const values = {
      code,
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
      grant_type: "authorization_code",
    };

    const getGoogleUser = async (values) => {
      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: qs.stringify(values),
        });
        const data = await response.json();
        if (data.error) return { error: data.error_description };
        return data;
      } catch (error) {
        console.log(error);
        return { error };
      }
    };

    const data = await getGoogleUser(values);
    if (data.error) return res.status(500).json({ error: data.error });
    const { id_token: idToken, access_token: accessToken } = data;
    const userDecoded = jwt.decode(idToken);

    const { email, given_name: firstName, family_name: lastName } = userDecoded;

    const user = await getUserByEmail(email);
    if (user.length === 0) {
      let createdAt = getTimeWithTimeZone();
      let username = assignId();
      const newUser = await createUser(
        firstName,
        lastName || "",
        email,
        username,
        "google",
        createdAt
      );
      if (newUser.error) return res.status(500).json({ error: newUser });
    }

    const userFromDb = user.length > 0 ? user : await getUserByEmail(email);
    generateTokenAndSetCookie(
      userFromDb[0].id,
      userFromDb[0].email,
      userFromDb[0].username,
      res
    );
    console.log("Google user logged in");
    return res.status(201).json({
      userId: userFromDb[0].id,
      email: userFromDb[0].email,
      username: userFromDb[0].username,
      firstName: userFromDb[0].first_name,
      lastName: userFromDb[0].last_name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const userSignUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const username = assignId();
  try {
    const newUser = await getUserByEmail(email);
    if (newUser.length > 0)
      return res
        .status(400)
        .json({ error: "Email already exists" });

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    )
      return res.status(400).json({ error: "All fields are required" });

    bcrypt.hash(password, saltRounds, async (error, hashed_password) => {
      if (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json(error);
      }
      let createdAt = getTimeWithTimeZone();
      let insertUser = await createUser(
        firstName,
        lastName,
        email,
        username,
        hashed_password,
        createdAt
      );
      if (insertUser.error) return res.status(500).json(insertUser);

      const user = await getUserByEmail(email);
      generateTokenAndSetCookie(
        user[0].id,
        user[0].email,
        user[0].username,
        res
      );
      console.log("user registered");
      return res.status(201).json({
        userId: user[0].id,
        email: user[0].email,
        username: user[0].username,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user.length === 0)
      return res.status(400).json({ error: "User not found" });

    const hashed_password = user[0].pswrd;
    const isPasswordCorrect = await bcrypt.compare(password, hashed_password);
    if (isPasswordCorrect === false)
      return res.status(400).json({ error: "Incorrect password" });

    generateTokenAndSetCookie(user[0].id, user[0].email, user[0].username, res);

    console.log("user logged in");

    return res.status(201).json({
      userId: user[0].id,
      email: user[0].email,
      username: user[0].username,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const userLogout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    console.log("user logged out");
    return res.status(200).json({ success: "Log out successful" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const editProfile = async (req, res) => {
  const { userId } = req.user;
  const { firstName, lastName } = req.body;
  try {
    if (firstName === undefined || lastName === undefined)
      return res.status(400).json({ error: "Missing required fields" });

    let modifyUser = await updateUser(userId, firstName, lastName);
    if (modifyUser.error) return res.status(500).json(modifyUser);

    return res.status(200).json({ success: "Profile updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const editPassword = async (req, res) => {
  const { userId } = req.user;
  const { password, newPassword } = req.body;
  try {
    const user = await getUserById(userId);
    if (user.length === 0) return res.status(400).json({ error: "User not found" });

    const oldPassword = user[0].pswrd;

    if (oldPassword === 'google') return res.status(400).json({ error: "You signed up with Google" });
    
    const isPasswordCorrect = await bcrypt.compare(password, oldPassword);
    if (isPasswordCorrect === false)
      return res.status(400).json({ error: "Make sure your current password is correct" });

    bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
      if (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json(error);
      }
      let modifyPassword = await updatePassword( userId, hashedPassword );
      if (modifyPassword.error) return res.status(500).json({error: modifyPassword});
      return res.status(201).json({ success: "Password updated" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const deleteAccount = async (req, res) => {
  const { userId } = req.user;
  try {
    user = await getUserById(userId);
    if (user.length === 0)
      return res.status(400).json({ error: "User not found" });

    await userLogout();

    removeUser = await deleteUser(userId);
    if (removeUser.error) return res.status(500).json(removeUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export {
  userSignUp,
  userLogin,
  userLogout,
  editProfile,
  deleteAccount,
  googleOAuthHandler,
  getProfile,
  editPassword,
};
