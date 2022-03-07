import { Box, Modal, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useWrongMessageState } from '../states';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PopoverMessage(props) {
  const [open, setOpen] = useState(false);
  const [wrongMessage, setWrongMessage] = useRecoilState(useWrongMessageState);

  useEffect(() => {
    if (wrongMessage.length > 0) {
      setOpen(true);
      setTimeout(() => {
        setWrongMessage('');
      }, 1000);
    } else {
      setOpen(false);
    }
  }, [wrongMessage]);

  return (
    <>
      {open && (
        <Box
          position="absolute"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '5',
            height: '20px',
            width: '100vw',
            mt: '20px',
          }}
        >
          <Box
            sx={{
              background: 'rgba(0, 0, 0, .8)',
              color: 'white',
              p: '10px',
              borderRadius: '10px',
            }}
          >
            {wrongMessage}
          </Box>
        </Box>
      )}
    </>
  );
}
