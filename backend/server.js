// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/images", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
