import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Typography,
} from "@mui/material";
import axios from "axios";
import FileDrop from "./components/FileDrop";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import UploadedImages from "./components/UploadedImages";
import Navbar from "./components/Navbar";

function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [deletingImageId, setDeletingImageId] = useState(null); // State to track deleting image
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/images/getAll",
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setImages(response.data);
      } catch (error) {
        console.error(error.response.data);
      } finally {
        setLoading(false); // Set loading to false after fetching images
      }
    };
    fetchImages();
  }, []);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    handleSubmit(e.dataTransfer.files[0]);
    setUploadedFiles([...uploadedFiles, e.dataTransfer.files[0]]);
  };

  const handleFileUpload = (e) => {
    handleSubmit(e.target.files[0]);
    setUploadedFiles([...uploadedFiles, e.target.files[0]]);
  };

  const handleSubmit = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authToken,
          },
        }
      );
      console.log(response.data);
      // Update images state after successful upload
      setImages([...images, response.data]);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      setDeletingImageId(id); // Set loading state for the specific image being deleted
      const authToken = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/images/${id}`, {
        headers: {
          Authorization: authToken,
        },
      });
      // Remove the deleted image from the images state
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setDeletingImageId(null); // Reset loading state after deletion operation completes
    }
  };

  const handleDownloadImage = (imagePath) => {
    saveAs(`http://localhost:5000/${imagePath}`, "image.jpg");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      <Navbar handleLogout={handleLogout} />

      <Button
        variant="contained"
        sx={{ display: "block", margin: "0 auto 50px auto" }}
        onClick={handleDrawerOpen}
      >
        Upload Image +
      </Button>

      {/* Display uploaded images or loading spinner */}
      {loading ? (
        <CircularProgress sx={{ margin: "0 auto", display: "block" }} />
      ) : images.length !== 0 ? (
        <UploadedImages
          images={images}
          deletingImageId={deletingImageId}
          handleDeleteImage={handleDeleteImage}
          handleDownloadImage={handleDownloadImage}
        />
      ) : (
        <Typography variant="h4" textAlign="center" marginTop="200px">
          No images to show... Click on the upload button to add images
        </Typography>
      )}

      {/* Drawer for uploading images */}
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <FileDrop
            handleFileDrop={handleFileDrop}
            handleFileUpload={handleFileUpload}
          />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Home;
