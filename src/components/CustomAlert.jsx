import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const CustomAlert = ({ open, message, type, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <MuiAlert onClose={onClose} severity={type} sx={{ width: '100%', fontSize: '1rem' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
