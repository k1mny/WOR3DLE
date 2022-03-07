import { Box, Divider, Link, Modal, Typography } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  color: 'white',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function ModalInfo(props) {
  const { open, handleClose } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          What{"'"}s this?
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          WOR3DLE is real time{' '}
          <Link href="https://www.nytimes.com/games/wordle/index.html">
            Wordle
          </Link>
          .<br /> Let{"'"}s type and wordle in physics!
        </Typography>
        <Divider />
        <Typography id="modal-modal-credit" sx={{ my: 2 }}>
          Wordle is created by{' '}
          <Link href="https://twitter.com/powerlanguish">Josh Wardle</Link>.
        </Typography>
        <Divider />
        <Typography id="modal-modal-credit-me" sx={{ mt: 2 }} align="right">
          WOR3DLE is created by{' '}
          <Link href="https://twitter.com/k1mny">kimny</Link>
        </Typography>
      </Box>
    </Modal>
  );
}
