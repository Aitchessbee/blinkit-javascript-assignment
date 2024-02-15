const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadImage,
  getAllImages,
  deleteImage,
} = require("../controllers/imageController"); // Import the deleteImage controller
const verifyToken = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20, // 5MB
  },
  fileFilter: fileFilter,
});

router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.get("/getAll", verifyToken, getAllImages);
router.delete("/:id", verifyToken, deleteImage); // Add the delete route

module.exports = router;
