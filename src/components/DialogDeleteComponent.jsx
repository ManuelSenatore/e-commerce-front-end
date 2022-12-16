import React from 'react';
import {
    Button ,
    Dialog ,
    DialogActions ,
    DialogContent ,
    DialogContentText ,
    DialogTitle ,
    Slide
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { removeOrder } from '../redux/actions/actions';

const Transition = React.forwardRef ( function Transition(props , ref) {
    return <Slide direction="up" ref={ ref } { ...props } />;
} );

// COMPONENTE UTILIZZATO ALL'ELIMINIZIONE DELL'ORDINE EFFETTUATO

const DialogDeleteComponent = (props) => {
    const dispatch = useDispatch()
    return (
        <Dialog
            open={ props.dialogEliminazioneFlag }
            onClose={props.handleClose}
            maxWidth={ 'xs' }
            TransitionComponent={ Transition }
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{ "Sei sicuro di voler eliminare l'elemento?" }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    L'azione sarà irreversibile.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={ "outlined" }
                    color={ "error" }
                    onClick={props.handleClose}
                >Anulla</Button>
                <Button
                    variant={ "outlined" }
                    color={ "primary" }
                    onClick={ () => {
                        dispatch(removeOrder(props.i))
                    } }
                >Elimina</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogDeleteComponent;