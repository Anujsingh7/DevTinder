const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("aa re pritam pyare");
});
app.use("/hello", (req, res) => {
  res.send("ding chika ding chika ding chika re re");
});
app.use("/", (req, res) => {
  res.send("chal beta selfi lele re");
});

app.listen(8888, console.log("server is successfully listening"));
