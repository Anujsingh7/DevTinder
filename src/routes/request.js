const express=require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter=express.Router();


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      const { firstName } = req.userData;
    //   console.log(firstName);
      res.send(firstName + " sent the connection request!");
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });


module.exports=requestRouter;