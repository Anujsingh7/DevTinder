const express = require("express");

const app = express();

/// queries param
app.get("/queries",(req,res)=>{
  console.log(req.query);
  res.send({firstName: "John", lastName: "Sinha"});
})


// Dynamics routes 
app.get("/dynamics/:first/:second/:third",(req,res)=>{
  console.log(req.params);
  res.send({firstName: "John", lastName: "Sinha"});
})



app.get("/user",(req,res)=>{
  res.send({firstName: "John", lastName: "Sinha"});
})
app.post("/user",(req,res)=>{
    res.send("Data stored in database successfully");
})
app.delete("/user",(req,res)=>{
    res.send("deleted successfully");
})

// "use" this will match all HTTP requests methods calls

app.use("/test", (req, res) => {
  res.send("aa re pritam pyare");
});
app.use("/hello", (req, res) => {
  res.send("ding chika ding chika ding chika re re");
});
app.use("/", (req, res) => {
  res.send("chal beta selfi lele re");
});

app.listen(7777, console.log("server is successfully listening"));
