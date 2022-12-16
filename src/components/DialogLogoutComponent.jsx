import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/actions";
import SnackbarSuccess from "./SnackBarSuccess";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// COMPONENTE CHE VIENE VISUALIZZATO QUANDO SI EFFETTUA IL LOGOUT

const DialogLogoutComponent = (props) => {
  const dispatch = useDispatch();
  const [snackUpdatePostitFlag, setSnackUpdatePostitFlag] =
    React.useState(false);

  const handleClickUpdate = () => {
    setSnackUpdatePostitFlag(true);
  };

  const handleCloseUpdate = () => {
    setSnackUpdatePostitFlag(false);
  };

  return (
    <>
      <SnackbarSuccess
        openFlag={snackUpdatePostitFlag}
        closeFunction={handleCloseUpdate}
        message={"Logout effettuato con successo!"}
      />
      <Dialog
        open={props.dialogEliminazioneFlag}
        onClose={props.handleClose}
        maxWidth={"xs"}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Sei sicuro di voler effettuare il logout?"}</DialogTitle>
        <DialogActions>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick={props.handleClose}
          >
            Anulla
          </Button>
          <Button
            variant={"outlined"}
            color={"error"}
            onClick={() => {
              dispatch(logout());
              handleClickUpdate();
              props.handleClose();
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogLogoutComponent;
