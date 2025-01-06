const mongoose = require('mongoose');

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://NamasteAnuj:wait@namasteanuj.f1w6a.mongodb.net/devTinder");

}

module.exports=connectDB;
