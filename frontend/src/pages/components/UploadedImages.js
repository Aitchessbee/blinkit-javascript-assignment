import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { saveAs } from "file-saver";

const UploadedImages = ({
  images,
  deletingImageId,
  handleDeleteImage,
  handleDownloadImage,
}) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {images.map((image) => (
        <Box key={image._id} sx={{ margin: "10px" }}>
          <img
            src={`http://localhost:5000/${image.imagePath}`}
            alt={`Uploaded file ${image._id}`}
            style={{ maxHeight: "300px" }}
          />
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={() => handleDownloadImage(image.imagePath)}
              disabled={deletingImageId === image._id} // Disable button while deleting
            >
              Download
            </Button>

            <Button
              onClick={() => handleDeleteImage(image._id)}
              disabled={deletingImageId === image._id} // Disable button while deleting
            >
              {deletingImageId === image._id ? (
                <CircularProgress size={24} /> // Show spinner if deleting
              ) : (
                "Delete"
              )}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default UploadedImages;
