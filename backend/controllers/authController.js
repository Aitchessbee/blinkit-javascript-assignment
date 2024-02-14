// controllers/authController.js
// Dummy data for demonstration purposes
let users = [];

exports.signup = (req, res) => {
  const { username, password } = req.body;
  // Validate input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }
  const newUser = { username, password };
  users.push(newUser);
  return res.status(201).json({ message: "User created successfully" });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  // Dummy authentication logic
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // Generate JWT
  const token = "dummy_token"; // In a real app, you'd generate a token using JWT
  return res.status(200).json({ token });
};
