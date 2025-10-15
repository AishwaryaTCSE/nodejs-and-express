const express = require("express");
const router = express.Router();
const {
  addUser,
  addProfile,
  getUsers,
  search,
  updateProfile,
  deleteProfile
} = require("../controllers/userController");

router.post("/add-user", addUser);
router.post("/add-profile/:userId", addProfile);
router.get("/get-users", getUsers);
router.get("/search", search);
router.put("/update-profile/:userId/:profileName", updateProfile);
router.delete("/delete-profile/:userId/:profileName", deleteProfile);

module.exports = router;
