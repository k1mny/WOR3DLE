import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ModalSettings from "./modal/settings";
import ModalInfo from "./modal/info";

export default function Header() {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  return (
    <>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            color='inherit'
            aria-label='Info'
            sx={{ flexBasis: "5%" }}
            onClick={handleOpenInfo}
          >
            <HelpOutlineOutlinedIcon />
          </IconButton>
          <Typography
            variant='h1'
            color='inherit'
            fontSize='20px'
            align='center'
            sx={{ flexBasis: "90%" }}
          >
            WORDLE 3D
          </Typography>
          <IconButton
            color='inherit'
            aria-label='Setting'
            sx={{ flexBasis: "5%" }}
            onClick={handleOpenSettings}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ModalSettings open={openSettings} handleClose={handleCloseSettings} />
      <ModalInfo open={openInfo} handleClose={handleCloseInfo} />
    </>
  );
}
