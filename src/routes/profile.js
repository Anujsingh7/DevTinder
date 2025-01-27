const express=require("express");
const { userAuth } = require("../middleware/auth");

const profileRouter=express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
      const userProfile = req.userData;
      res.send(userProfile);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

  module.exports=profileRouter;
