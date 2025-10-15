const User = require("../models/userModel");


exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

exports.addProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { profileName, url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent duplicate profile types
    const exists = user.profiles.find(p => p.profileName === profileName);
    if (exists) return res.status(400).json({ message: "Profile already exists for this user" });

    user.profiles.push({ profileName, url });
    await user.save();

    res.status(201).json({ message: "Profile added successfully", user });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;
    let users;

    if (profile) {
      users = await User.find({ "profiles.profileName": profile });
    } else {
      users = await User.find();
    }

    res.json({ count: users.length, users });
  } catch (err) {
    next(err);
  }
};


exports.search = async (req, res, next) => {
  try {
    const { name, profile } = req.query;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const foundProfile = user.profiles.find(p => p.profileName === profile);

    if (foundProfile) {
      res.json({ user: user.name, profile: foundProfile });
    } else {
      res.json({
        message: "User found, but profile not found",
        user: { name: user.name, email: user.email }
      });
    }
  } catch (err) {
    next(err);
  }
};


exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.find(p => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.url = url;
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles = user.profiles.filter(p => p.profileName !== profileName);
    await user.save();

    res.json({ message: "Profile deleted successfully", user });
  } catch (err) {
    next(err);
  }
};
