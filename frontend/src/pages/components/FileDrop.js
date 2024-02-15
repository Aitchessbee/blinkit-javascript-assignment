import React from "react";
import { Box, Typography, Button } from "@mui/material";

function FileDrop({ handleFileDrop, handleFileUpload }) {
  const openFileDialog = () => {
    const fileInput = document.getElementById("upload-button");
    fileInput.click();
  };

  return (
    <Box
      sx={{
        margin: "20px",
        border: "2px dashed #aaa",
        padding: "20px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
      }}
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h4">Drag and drop files here</Typography>
        <Typography variant="h6" textAlign="center">
          or
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="upload-button"
        />
        <Button
          variant="contained"
          sx={{ display: "block", margin: "0 auto" }}
          onClick={openFileDialog}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}
export default FileDrop;
