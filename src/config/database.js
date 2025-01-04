const mongoose = require('mongoose');

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://NamasteAnuj:nmGehRIw6dmAqcGK@namasteanuj.f1w6a.mongodb.net/devTinder");

}

module.exports=connectDB;