import React from "react";
import { Box, Button, Typography } from "@mui/material";

function Navbar({ handleLogout }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginY: "30px",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ marginLeft: "calc(50% - 150px)" }}
      >
        Image Viewer
      </Typography>

      <Button
        variant="contained"
        color="error"
        sx={{ marginLeft: "auto", marginRight: "20px", height: "40px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}

export default Navbar;
