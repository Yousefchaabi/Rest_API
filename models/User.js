const mongoose = require("mongoose");

//Declare the Schema of the mongo model
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "the user name is a required field"],
    minLength: [6, "the user name minimum length is 6"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      `Please fill valid email address`,
    ],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
    match: [
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])[A-Za-z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/]{8,}$/,
      "Invalid password",
    ],
  },

  birthDate: {
    type: String,
  },
});

module.exports = User = mongoose.model("User", userSchema);
