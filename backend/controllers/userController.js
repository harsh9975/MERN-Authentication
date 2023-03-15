import userModal from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userRegistration = async (req, res) => {
  const { name, email, password, password_confirm, tc } = req.body;
  const user = await userModal.findOne({ email: email });
  if (user) {
    res.status(400).json({ status: 400, message: "Email Already Exist" });
  } else {
    if (name && email && password && password_confirm && tc) {
      if (password === password_confirm) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const user = new userModal({
            name,
            email,
            password: hashPassword,
            tc,
          });
          await user.save();
          const saved_user = await userModal.findOne({ email: email });

          //generate jwt
          const token = jwt.sign(
            { userId: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );

          res.status(201).json({
            status: 200,
            message: "User Registered Successfully",
            token,
          });
        } catch (error) {
          res.status(400).json({ status: 400, message: "Error Encountered" });
        }
      } else {
        res
          .status(400)
          .json({ status: 400, message: "Password doesn't match" });
      }
    } else {
      res.status(400).json({ status: 400, message: "All fields are required" });
    }
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userModal.findOne({ email: email });
      if (user !== null) {
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isPassMatch) {
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res
            .status(200)
            .json({ status: 200, message: "Login Successful", token,user });
        } else {
          res
            .status(400)
            .json({ status: 400, message: "Email or Password not valid" });
        }
      } else {
        res.status(400).json({ status: 400, message: "User not registered!" });
      }
    } else {
      res.status(400).json({ status: 400, message: "All fields are required" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

export const changeUserPassword = async (req, res) => {
  const { password, password_confirm } = req.body;
  if (password && password_confirm) {
    if (password !== password_confirm) {
      res.status(400).json({ status: 400, message: "Password does not match" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await userModal.findByIdAndUpdate(req.user._id, {
        $set: { password: hashPassword },
      });
      res.status(201).json({
        status: 200,
        message: "Password Changed Successfully",
      });
    }
  } else {
    res.status(400).json({ status: 400, message: "All fields are required" });
  }
};

export const userProfile = async (req, res) => {
  res.status(201).json({
    status: 200,
    message: "User Fetched Successfully",
    user: req.user,
  });
};

export const userForgotPassword = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await userModal.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "15m",
      });
      const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`;
      console.log("link", link);
      res.status(201).json({
        status: 200,
        message: "Reset link sent please check your email",
      });
    } else {
      res.status(400).json({ status: 400, message: "Email does not exist" });
    }
  } else {
    res.status(400).json({ status: 400, message: "All fields are required" });
  }
};

export const userPasswordReset = async (req, res) => {
  const { password, password_confirm } = req.body;
  const { id, token } = req.params;
  if (password && password_confirm) {
    if (password === password_confirm) {
      const user = await userModal.findById(id);
      console.log("user", user);
      if (user) {
        const new_secret = user._id + process.env.JWT_SECRET_KEY;
        try {
          jwt.verify(token, new_secret);
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await userModal.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.status(201).json({
            status: 200,
            message: "Password reset successfully",
          });
        } catch (err) {
          res.status(400).json({ status: 400, message: "check" });
        }
      } else {
        res.status(400).json({ status: 400, message: "User not found" });
      }
    } else {
      res.status(400).json({ status: 400, message: "Password does not match" });
    }
  } else {
    res.status(400).json({ status: 400, message: "All fields are required" });
  }
};
