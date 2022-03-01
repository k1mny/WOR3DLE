import React from "react";
import { Box } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function Info() {
  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        top: "0",
        right: "0",
        backgroundColor: "white",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "5",
      }}
    >
      <HelpOutlineOutlinedIcon style={{ width: "30px", height: "30px" }} />
    </Box>
  );
}
