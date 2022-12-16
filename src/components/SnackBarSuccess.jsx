import React from "react";
import { Alert, Snackbar } from "@mui/material";

// SNACK BAR UTILIZZATA NEL CASO DI LOGOUT DI UN UTENTE

const SnackbarSuccess = ({ openFlag, closeFunction, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openFlag}
      autoHideDuration={4000}
      onClose={closeFunction}
    >
        <Alert severity="info">{message}</Alert>
    </Snackbar>
  );
};
export default SnackbarSuccess;
