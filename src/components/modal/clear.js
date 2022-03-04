import {
  Box,
  Button,
  Divider,
  Link,
  Modal,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { COLOR_CLEAR, COLOR_INCORRECT } from "../constants";
import { useBoxApiState, useClearState, useContentsState } from "../states";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  color: "white",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const makeResult = (api) => {
  const resultBoxes = api.map((obj) => {
    if (COLOR_CLEAR.equals(obj.mat.current.color)) {
      return "🟩";
    } else if (COLOR_INCORRECT.equals(obj.mat.current.color)) {
      return "🟨";
    } else {
      return "⬛";
    }
  });
  const length = Math.ceil(resultBoxes.length / 5);
  const rows = new Array(length)
    .fill()
    .map((_, i) => resultBoxes.slice(i * 5, (i + 1) * 5).join(""));
  return rows.reverse();
};

export default function ModalClear() {
  const clear = useRecoilValue(useClearState);
  const contents = useRecoilValue(useContentsState);
  const boxApi = useRecoilValue(useBoxApiState);
  const [anchorEl, setAnchorEl] = useState(null);

  const date = new Date();
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const clearRowText =
    clear === "clear" ? (boxApi.length / 5).toString() + "/6" : "X/6 ";

  const handleClick = (event) => {
    const resultText =
      "WOR3DLE " +
      year +
      "/" +
      month +
      "/" +
      day +
      "\n" +
      clearRowText +
      "\n\n" +
      makeResult(boxApi).join("\n");

    copyTextToClipboard(resultText);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Modal
      open={clear === "clear" || clear === "failed"}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          align='center'
        >
          WOR3DLE {year + "/" + month + "/" + day}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography id='modal-modal-description' sx={{ my: 2 }}>
            <Typography align='center'>{clearRowText}</Typography>
            {makeResult(boxApi).map((row, idx) => (
              <div key={idx}>{row}</div>
            ))}
          </Typography>
          <Divider />
          <Button
            variant='outlined'
            aria-describedby={id}
            onClick={handleClick}
          >
            share
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Copied to clipboard!</Typography>
          </Popover>
        </Box>
      </Box>
    </Modal>
  );
}
