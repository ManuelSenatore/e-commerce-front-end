import { Button } from "@mui/material";
import React from "react";
import { Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCarrelloList } from "../redux/actions/actions";
import { useState } from "react";
import { useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingComponent from "./LoadingComponent";

// CARD DEL CARRELLO DOVE è POSSIBILE SETTARE LA QUANTITà ED ELIMINARLO DAL CARRELLO

const CarrelloCard = (props) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formObj, setFormObj] = useState({
    quantity: props.elemento.quantity,
  });

  const handleForm = (key, value) => {
    // setta l'oggetto del form
    setFormObj({
      ...formObj,
      [key]: value,
    });
  };

  const [loading, setLoadingComponent] = React.useState(false);

  const loadingOn = () => {
    setLoadingComponent(true);
  };

  const loadingOff = () => {
    setLoadingComponent(false);
  };

  const removeToCarrello = async (elementoId) => {
    const baseEndpoint = `http://localhost:8080/api/carrello/delete/${elementoId}/${user.id}`;

    const header = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "DELETE",
        headers: header,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(getCarrelloList(token, user.id));
        loadingOff();
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (elementoId, formObj) => {
    const baseEndpoint = `http://localhost:8080/api/carrello/update/${elementoId}`;

    const header = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(formObj),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(getCarrelloList(token, user.id));
        loadingOff();
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateQuantity(props.elemento.id, formObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formObj.quantity]);

  return (
    <Col className="mb-3" xs={12}>
      <LoadingComponent loading={loading} loadingOff={loadingOff} />
      <Card
        className="cardProdotto cardCarrello d-flex flex-row align-items-center"
        key={props.i}
        style={{ width: 100 + "%" }}
      >
        <div style={{ width: "10rem", overflow: "hidden" }}>
          <Card.Img
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dettagli" + props.elemento.prodotto.id)}
            variant="top"
            src={props.elemento.prodotto.immagineUrl}
          />
        </div>
        <Card.Body>
          <Card.Title className="mt-2">
            {props.elemento.prodotto.nome}
          </Card.Title>
          <Card.Text className="flex-end" style={{ fontWeight: "bolder" }}>
            {props.elemento.prodotto.prezzo.toString().split(".")[0]},
            {props.elemento.prodotto.prezzo.toString().split(".")[1]
              ? props.elemento.prodotto.prezzo
                  .toString()
                  .split(".")[1]
                  .slice(0, 2).length === 1
                ? props.elemento.prodotto.prezzo
                    .toString()
                    .split(".")[1]
                    .slice(0, 2) + "0"
                : props.elemento.prodotto.prezzo
                    .toString()
                    .split(".")[1]
                    .slice(0, 2) + ""
              : "00"}{" "}
            €
          </Card.Text>
          <div className="form-sm" data-form-parent="">
            <div className="input-group">
              <Button
                onClick={() => {
                  handleForm("quantity", formObj.quantity - 1);
                  loadingOn();
                }}
                disabled={props.elemento.quantity === 1 ? true : false}
              >
                -
              </Button>
              <span>{formObj.quantity}</span>
              <Button
                onClick={() => {
                  handleForm("quantity", props.elemento.quantity + 1);
                  loadingOn();
                }}
              >
                +
              </Button>
            </div>
            <small className="invalid-feedback"></small>
          </div>
        </Card.Body>
        <ClearIcon
          className="align-self-start"
          onClick={() => {
            removeToCarrello(props.elemento.id);
            loadingOn();
          }}
          style={{ cursor: "pointer", color: "red" }}
        />
      </Card>
    </Col>
  );
};

export default CarrelloCard;
