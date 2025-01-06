const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // verify the token at the server
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid users");
    }

    // verity the token at the server.
    const user = jwt.verify(token, "Anuj@DevTinder7");
    if (!user) {
      throw new Error("Invalid users");
    }

    const { _id } = user;
    const userData = await User.findById(_id);
    if (!userData) {
      throw new Error("User not found");
    }

    req.userData = userData;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
