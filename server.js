//require express , mongoose, dotenv
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//invoke express
const app = express();
// import user schema from User.js
const user = require("./models/User");
//create port
const port = 5000;
const PWD = process.env.PWD;
const USER = process.env.USER;
// connexion database with server
const mongo_uri = `mongodb+srv://${USER}:${PWD}@chaabi-cluster.iej3n21.mongodb.net/users?retryWrites=true&w=majority`;
mongoose
  .connect(mongo_uri)
  .then(() => console.log("connected success..."))
  .catch((err) => console.log(err));

// parse data to json object
app.use(express.json());

// getting all users
app.get("/allUsers", async (req, res) => {
  try {
    const users = await user.find(); // find all users and return them
    res.send(users); // show users
  } catch (err) {
    res.status(500).json({ message: err.message }); // error
  }
});

// adding new user
app.post("/addUser", async (req, res) => {
  const newUser = new user({
    // assign the new values from the req.body
    userName: req.body.userName, // assign the new values from the req.body
    email: req.body.email, // assign the new values from the req.body
    password: req.body.password, // assign the new values from the req.body
    birthDate: req.body.birthDate,
  });
  try {
    const User = await newUser.save(); // save the new user added
    res.status(201).json(User); // msg success
  } catch (err) {
    res.status(400).json({ message: err.message }); //msg error
  }
});

// updating user by id
app.put("/updateUser/:id", async (req, res) => {
  const { userName, birthDate } = req.body; // destructuring elemets from req.body
  try {
    const updatedUser = await user.findById(req.params.id); // getting user to update
    updatedUser.userName = userName; //assign the new value to firstName
    updatedUser.birthDate = birthDate; //assign the new value to lasstName
    const us = await updatedUser.save(); // save modification and return the updated user
    res.status(201).json(us); // message success
  } catch (err) {
    res.status(500).json({ message: err.message }); // error
  }
});

// deleting user
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const response = await User.deleteOne({ _id: req.params.id });
    response.deletedCount
      ? res.send({ message: "User Deleted Successufly" })
      : res.send({ message: "User Already DELETED" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Can not Delete User");
  }
});

// listen on port 5000
app.listen(port, (err) => {
  err ? console.log(err) : console.log("running server on  port 5000.....");
});
