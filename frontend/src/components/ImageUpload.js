// ImageUpload.js
import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "dummy_token", // Attach JWT
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ImageUpload;
