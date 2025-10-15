const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add address to user
exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { street, city, state, country, pincode } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push({ street, city, state, country, pincode });
    await user.save();

    res.json({ message: "Address added successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get summary of all users
exports.getSummary = async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const totalAddresses = users.reduce((sum, u) => sum + u.addresses.length, 0);

    const userSummary = users.map(u => ({
      name: u.name,
      numberOfAddresses: u.addresses.length
    }));

    res.json({ totalUsers, totalAddresses, userSummary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user details by ID
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete specific address
exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.json({ message: "Address deleted successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
