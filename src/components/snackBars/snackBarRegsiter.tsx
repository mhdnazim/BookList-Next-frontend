import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
    open : boolean,
    setOpen : any,
    value : string
}

export default function CustomizedSnackBars({ open, setOpen, value}: Props) {

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {value}
        </Alert>
      </Snackbar>
    </div>
  );
}