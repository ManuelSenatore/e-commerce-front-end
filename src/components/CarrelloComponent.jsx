import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarrelloList } from "../redux/actions/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import CarrelloCard from "./CarrelloCard";

// COMPONENTE CARRELLO DOVE VENGONO AGGIUNTI I PRODOTTI ,SEGNALA IL PREZZO TOTALE E REINDIRIZZA ALLA PAGINA CHECKOUT

const CarrelloComponent = () => {
  const user = useSelector((state) => state.user.user);
  const carrelloList = useSelector((state) => state.carrello.carrelloList);
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (token === undefined) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    dispatch(getCarrelloList(token, user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="pageContainer">
      <h2 style={{fontFamily: 'fantasy'}}>CARRELLO</h2>
      <Row className="display-flex justify-content-beetween">
        {carrelloList.cartItems.length === 0 ? (
          <Col className="d-flex flex-column justify-content-center align-items-center ">
            <h3>Nessun elemento aggiunto al carrello!</h3>{" "}
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Vai allo Shop
            </Button>{" "}
          </Col>
        ) : (
          carrelloList.cartItems.map((elemento, i) => (
            <CarrelloCard elemento={elemento} key={i} />
          ))
        )}
      </Row>
      <Row>
        <Col className="d-flex" style={{ justifyContent: "flex-end" }}>
          {carrelloList.totalCost !== 0 && (
            <div className="flex-end">
              <h6
                className="text-center"
                style={{ color: "green", fontWeight: "bolder" }}
              >
                {carrelloList.totalCost.toString().split(".")[0]},
                {carrelloList.totalCost.toString().split(".")[1]
                  ? carrelloList.totalCost.toString().split(".")[1].slice(0, 2)
                      .length === 1
                    ? carrelloList.totalCost
                        .toString()
                        .split(".")[1]
                        .slice(0, 2) + "0"
                    : carrelloList.totalCost
                        .toString()
                        .split(".")[1]
                        .slice(0, 2) + ""
                  : "00"}{" "}
                €
              </h6>
              <Button onClick={() => navigate("/checkout")}>Acquista</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CarrelloComponent;
