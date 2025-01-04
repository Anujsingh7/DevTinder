const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
// const {adminAuth}=require("./middleware/auth")

app.use(express.json()); /// express middleware.

// ! get data from user and then store in the database actually playing with data send form body of postman.
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }
    res.send("Login Successful");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.patch("/signUp", async (req, res) => {
  // api level data sanitization.
  const id = req.body.id;
  try {
    const ALLOW_UPDATE = ["id", "age", "photoUrl", "password", "skills"];
    const isUpdateAllow = Object.keys(req.body).every((k) =>
      ALLOW_UPDATE.includes(k)
    );
    if (!isUpdateAllow) {
      throw new Error("Invalid Update Field");
    }
    if (req.body?.skills.length > 10) {
      throw new Error("Skills length should not exceed 10");
    }
    const isFoundUser = await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    if (!isFoundUser) {
      throw new Error("No data present for given user");
    }
    res.send("data updated successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User! " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  const email = req.body.email;
  try {
    const users = await User.find({ email: email });
    res.send(users);
  } catch (err) {
    res.status(400).send("data not fetched successfully " + err.message);
  }
});

app.delete("/signUp", async (req, res) => {
  const id = req.body.id;
  try {
    const check = await User.findByIdAndDelete(id);
    if (!check) {
      throw new Error("No data present for given user");
    }
    res.send("data deleted successfully");
  } catch (err) {
    res.status(400).send("data not deleted successfully " + err.message);
  }
});

// app.post("/signUp", async (req, res) => {
// const user = new User({
//   firstName: "Mahender",
//   lastName: "Singh",
//   email: "mahender@gmail.com",
//   passworddd: "123456",
// });
//   try {
//     await user.save();
//     res.send("user added successfully");
//   } catch (err) {
//     res.status(400).send("data not stored successfully " + err.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(7777, console.log("server is successfully listening"));
  })
  .catch((err) => {
    console.error("Database connection error " + err.message);
  });

// ! use of dummy middleware

// app.use("/admin",adminAuth);

// app.get("/admin/getData",(req,res)=>{
//   console.log("Admin data accessed");
//   res.send("Admin data fetched successfully");
// })
// app.get("/admin/deleteData",(req,res)=>{
//   console.log("Admin data deleted");
//   res.send("Admin data deleted successfully");
// })

//! middleware concepts and next() and error along with res.send().

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Middleware 1");
//     next();
//     res.send("user is working 1");
//   },
//   (req, res, next) => {
//     console.log("Middleware 2");
//     res.send("user is working 2");
//     // next();
//   }
// );

///! queries param
// app.get("/queries",(req,res)=>{
//   console.log(req.query);
//   res.send({firstName: "John", lastName: "Sinha"});
// })

// ! Dynamics routes
// app.get("/dynamics/:first/:second/:third",(req,res)=>{
//   console.log(req.params);
//   res.send({firstName: "John", lastName: "Sinha"});
// })

// app.get("/user",(req,res)=>{
//   res.send({firstName: "John", lastName: "Sinha"});
// })
// app.post("/user",(req,res)=>{
//     res.send("Data stored in database successfully");
// })
// app.delete("/user",(req,res)=>{
//     res.send("deleted successfully");
// })

//! "use" this will match all HTTP requests methods calls

// app.use("/test", (req, res) => {
//   res.send("aa re pritam pyare");
// });
// app.use("/hello", (req, res) => {
//   res.send("ding chika ding chika ding chika re re");
// });
// app.use("/", (req, res) => {
//   res.send("chal beta selfi lele re");
// });
