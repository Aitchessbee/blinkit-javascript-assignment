import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token); // Store JWT in local storage
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data?.message); // Set error message
      console.error(error.response.data?.message);
    }
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "80%",
          display: "flex",
          borderRadius: "10px",
          width: "80%",
          overflow: "hidden",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "40%", // Adjust width
            padding: "30px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4" mb={3}>
            Signup
          </Typography>

          <TextField
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: "20px", width: "70%" }}
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: "20px", width: "70%" }}
          />

          <Typography variant="body2" color="error" mb={1}>
            {error}
          </Typography>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ marginBottom: "10px" }}
          >
            Sign Up
          </Button>

          <Link to="/login">Already have an account? Log in</Link>
        </Box>
        <Box style={{ width: "60%" }}>
          <img
            src="assets/bgimage.jpg"
            alt="bg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
