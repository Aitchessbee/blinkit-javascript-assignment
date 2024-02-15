const Image = require("../models/imageModel");
const fs = require("fs");
const path = require("path");

exports.uploadImage = async (req, res) => {
  try {
    // Save image data to MongoDB using Mongoose
    const newImage = new Image({
      imageName: req.file.originalname,
      imagePath: req.file.path,
      uploadedBy: req.user._id,
    });
    const savedImage = await newImage.save();
    res.json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    // Get all images associated with the logged-in user
    const images = await Image.find({ uploadedBy: req.user._id });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  const imageId = req.params.id;

  try {
    // Find the image by ID and check if it belongs to the logged-in user
    const image = await Image.findOne({
      _id: imageId,
      uploadedBy: req.user._id,
    });
    if (!image) {
      return res
        .status(404)
        .json({ message: "Image not found or unauthorized" });
    }

    // Delete the image from MongoDB
    await Image.deleteOne({ _id: imageId });

    // Delete the image file from the uploads folder
    const imagePath = path.join(__dirname, "..", image.imagePath);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
        return res.status(500).json({ message: "Error deleting image file" });
      }
      console.log("Image file deleted successfully");
    });

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
