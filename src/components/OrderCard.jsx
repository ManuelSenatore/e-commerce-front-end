import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import ModalQuantityComponent from "./ModalQuantityComponent";
import ProdottoOrdineCard from "./ProdottoOrdineCard";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import DialogDeleteComponent from "./DialogDeleteComponent";

// CARD PRODOTTO UTILIZZATA NEL MODALE DI TUTTI I PRODOTTI ACQUISTATI IN UN DETERMINATO ORDINE

const OrderCard = (props) => {
  const dispatch = useDispatch();
  const [dialogFlag, setDialogFlag] = useState(false);

  const handleClickOpen = () => {
    setDialogFlag(true);
  };

  const handleClose = () => {
    setDialogFlag(false);
  };

  const [ dialogEliminazioneFlag , setDialogEliminazioneFlag ] = useState (false);
    const handleOpen = () => {
        setDialogEliminazioneFlag(true);
    };
    const handleClosed = () => {
        setDialogEliminazioneFlag(false);
    };
  
  return (
    <Col className="mb-3 d-flex flex-column justify-content-center align-items-center w-100" xs={12}>
      <ModalQuantityComponent
        dialogFlag={dialogFlag}
        handleClose={handleClose}
        prodotto={props.order}
      />
      <DialogDeleteComponent 
        dialogEliminazioneFlag={dialogEliminazioneFlag}
        handleClose = {handleClosed}
        i = {props.i}
      />  
      <Card
        className="cardProdotto cardCarrello d-flex flex-row align-items-center"
        style={{ maxWidth: "100rem" }}
      >
        <div style={{ width: "10rem", overflow: "hidden" }}>
          <Card.Img
            onClick={() => {
              setDialogFlag(true);
            }}
            style={{ cursor: "pointer" }}
            variant="top"
            src={props.order.cartItems[0].prodotto.immagineUrl}
          />
        </div>
        <Card.Body>
          <Card.Title>
            Prodotti ordinati: {props.order.cartItems.length}
          </Card.Title>
          <Card.Text
            onClick={() => {
              setDialogFlag(true);
            }}
            style={{ cursor: "pointer", color: "blue" }}
            className="text-start"
          >
            Clicca per visualizzare tutti i prodotti
          </Card.Text>
          <Card.Text className="" style={{ fontWeight: "bolder" }}>
            Prezzo totale: 
            {props.order.totalCost.toString().split(".")[0]},
            {props.order.totalCost.toString().split(".")[1]
              ? props.order.totalCost.toString().split(".")[1].slice(0, 2)
              .length === 1
              ? props.order.totalCost.toString().split(".")[1].slice(0, 2) +
                  "0"
                : props.order.totalCost.toString().split(".")[1].slice(0, 2) +
                  ""
                  : "00"}{" "}
            €
          </Card.Text>
          <Card.Text>Consegna stimata 5-7 giorni lavorativi</Card.Text>
          {props.order.cartItems.map((prodotto, i) => {
            <ProdottoOrdineCard prodotto={prodotto} key={i} />;
          })}
        </Card.Body>
        <Card.Footer className="d-flex flex-column justify-content-flex-start align-items-start" style={{backgroundColor: 'white', border: 'none'}}>
        <ClearIcon
          className="deleteIconOrder"
          onClick={() => {
            handleOpen()
          }}
          style={{ cursor: "pointer", color: "red" }}
        />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default OrderCard;
