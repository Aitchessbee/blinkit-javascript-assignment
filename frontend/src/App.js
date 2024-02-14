import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login"; // Ensure Login component is exported correctly
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/upload" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
