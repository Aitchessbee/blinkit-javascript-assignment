// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Verify JWT
    const decoded = jwt.verify(token, "image_app");
    console.log(decoded);
    // Check if user exists
    const user = await User.findById(decoded?.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Attach user info to request object
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
