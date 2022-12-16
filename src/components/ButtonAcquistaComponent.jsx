import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarrelloList } from "../redux/actions/actions";
import LoadingButton from "@mui/lab/LoadingButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useNavigate } from "react-router-dom";
import DialogComponent from "./DialogComponent";
import { useState } from "react";

// BOTTONE PER L'AGGIUNTA DI UN PRODOTTO AL CARRELLO

const ButtonAcquistaComponent = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.user.token);
  const carrelloList = useSelector((state) => state.carrello.carrelloList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialogEliminazioneFlag, setDialogEliminazioneFlag] = useState(false);

  const handleClickOpen = () => {
    setDialogEliminazioneFlag(true);
  };

  const handleClickClose = () => {
    setDialogEliminazioneFlag(false);
  };

  function handleClick() {
    setLoading(true);
  }

  function handleClose() {
    setLoading(false);
  }

  const addToFavorite = async (prodottoId) => {
    const baseEndpoint = "http://localhost:8080/api/carrello/aggiungi";

    const header = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = {
      userId: user.id,
      prodottoId: prodottoId,
      quantity: 1,
    };
    try {
      const response = await fetch(baseEndpoint, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(getCarrelloList(token, user.id));
        handleClose();
        setDisabled(true);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogComponent
        dialogEliminazioneFlag={dialogEliminazioneFlag}
        handleClose={handleClickClose}
      />
      {carrelloList.cartItems.some(
        (el) => el.prodotto.id === props.prodotto
      ) ? (
        <Button
          onClick={() => navigate("/carrello")}
          variant="contained"
          color="success"
          endIcon={<DoneOutlineIcon />}
        >
          Aggiunto
        </Button>
      ) : (
        <LoadingButton
          disabled={disabled}
          size="medium"
          onClick={() => {
            if (!token) {
              setDialogEliminazioneFlag(true);
            } else {
              addToFavorite(props.prodotto);
              handleClick();
            }
          }}
          endIcon={<AddShoppingCartIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Aggiungi
        </LoadingButton>
      )}
    </>
  );
};

export default ButtonAcquistaComponent;
