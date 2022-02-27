import { Box } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { useClearState } from "./states";

export default function Clear() {
  const clear = useRecoilValue(useClearState);
  if (clear === "clear") {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          fontSize: "120px",
          backgroundColor: "rgba(0, 0, 0, .8)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Melete",
          zIndex: "10",
        }}
      >
        Clear!
      </Box>
    );
  } else if (clear === "failed") {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          fontSize: "120px",
          backgroundColor: "rgba(0, 0, 0, .8)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Melete",
          zIndex: "10",
        }}
      >
        Failed
      </Box>
    );
  }
  return null;
}
