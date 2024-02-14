// controllers/imageController.js
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  return res.status(201).json({ message: "Image uploaded successfully" });
};
