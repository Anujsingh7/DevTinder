const validator = require("validator");
const validateSignUpData = (req) => {
  const {firstName, lastName, email, password} = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};

module.exports = { validateSignUpData };
