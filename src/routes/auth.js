const express=require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

const authRouter=express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // validate the users
      validateSignUpData(req);
  
      // password validation
      const hashPassword = await bcrypt.hash(password, 10);
      // console.log(hashPassword);
  
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      await user.save();
      res.send("user added successfully");
    } catch (err) {
      if (err.code === 11000) {
        // This error code indicates a duplicate key error
        res.status(400).send("Email already exists");
      } else {
        res.status(400).send("ERROR : " + err.message);
      }
    }
  });
  
  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const isMatch = await user.validatePassword(password);
      if (!isMatch) {
        throw new Error("Invalid Credentials");
      }
      // generating jwt token
      const token = await user.getJWT();
      // console.log(token);
      // send cookie to client from server
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      // console.log(cookie);
      res.send("Login Successful");
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }
  });

  module.exports=authRouter;