import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
    setValue : any,
    value : boolean
}

export default function CommonSnackBars({  setValue, value}: Props) {

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setValue(false);
  };

  return (
    <>
      <Snackbar open={value} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Success...!
        </Alert>
      </Snackbar>
    </>
  );
}