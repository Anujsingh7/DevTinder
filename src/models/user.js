//
const validator = require("validator");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt =require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength:4,
      maxLength:50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value)
      {
          if(!validator.isStrongPassword(value))
              {
                  throw new Error("Password is not Strong");
              }
      }  
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data in not valid");
        }
      },
      // enum: ['male', 'female', 'other']
    },
    photoUrl: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Url is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);


userSchema.methods.getJWT= async function(){
  const user=this;
  const token=await jwt.sign({_id:user._id},"Anuj@DevTinder7", { expiresIn: '1h' });
  return token;
}

userSchema.methods.validatePassword= async function(passwordInputByUser)
{
    const user=this;
    passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash)
    return isPasswordValid;

}
module.exports = mongoose.model("User", userSchema);
