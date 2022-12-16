import React from "react";
import { Col, Card } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPreferitiList } from "../redux/actions/actions";
import ButtonAcquistaComponent from "./ButtonAcquistaComponent";
import LoadingComponent from "./LoadingComponent";

// CARD PRODOTTO UTILIZZATA NEL COMPONENTE DEI PREFERITI

const PreferitoCard = (props) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoadingComponent] = React.useState(false);

  const loadingOn = () => {
    setLoadingComponent(true);
  };

  const loadingOff = () => {
    setLoadingComponent(false);
  };

  const removeToFavorite = async (elementoId) => {
    const baseEndpoint = `http://localhost:8080/api/preferiti/delete/prodotto/${elementoId}/${user.id}`;

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
        console.log(data);
        dispatch(getPreferitiList(token, user.id));
        loadingOff()
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col xs={6} sm={6} md={4}>
      <LoadingComponent loading={loading} loadingOff={loadingOff} />
      <Card
        className="cardProdotto"
        key={props.i}
        style={{ border: "none", width: 100 + "%" }}
      >
        <MdDeleteForever
          onClick={() => {
            removeToFavorite(props.preferito.id);
            loadingOn()
          }}
          className="favoriteIcon"
          style={{ cursor: "pointer", zIndex: 100 }}
        />
        <Card.Img
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dettagli" + props.preferito.id)}
          variant="top"
          src={props.preferito.immagineUrl}
        />
        <Card.Body className="text-center cardButton">
          <ButtonAcquistaComponent prodotto={props.preferito.id} />
          <Card.Title className="mt-2">
            {props.preferito.nome.substring(0, 20) + "..."}
          </Card.Title>
          <Card.Text style={{ color: "green", fontWeight: "bolder" }}>
            {props.preferito.prezzo.toString().split(".")[0]},
            {props.preferito.prezzo.toString().split(".")[1]
              ? props.preferito.prezzo.toString().split(".")[1].slice(0, 2)
                  .length === 1
                ? props.preferito.prezzo.toString().split(".")[1].slice(0, 2) +
                  "0"
                : props.preferito.prezzo.toString().split(".")[1].slice(0, 2) +
                  ""
              : "00"}{" "}
            €
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PreferitoCard;
