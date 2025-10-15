const mongoose = require("mongoose");

// Profile subdocument schema
const profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    required: [true, "Profile name is required"],
    enum: {
      values: ["fb", "twitter", "github", "instagram"],
      message: "Profile name must be one of fb, twitter, github, instagram"
    }
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    match: [/^https?:\/\/.+/, "Please provide a valid URL"]
  }
});

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  profiles: [profileSchema]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
