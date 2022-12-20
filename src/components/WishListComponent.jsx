import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPreferitiList } from "../redux/actions/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import PreferitoCard from "./PreferitoCard";

// COMPONENTE DOVE L'UTENTE VISUALIZZA GLI ARTICOLI AGGIUNTI AI PREFERITI

const WishListComponent = () => {
  const user = useSelector((state) => state.user.user);
  const preferitiList = useSelector((state) => state.preferiti.preferitiList);
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
    dispatch(getPreferitiList(token, user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="pageContainer">
      <h2 style={{fontFamily: 'fantasy'}} className="titlePage">PREFERITI</h2>
      <Row className="display-flex justify-content-beetween">
        {preferitiList.length === 0 ? (
          <Col className="d-flex flex-column justify-content-center align-items-center ">
            <h3>La tua lista è vuota</h3>{" "}
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Vai allo Shop
            </Button>{" "}
          </Col>
        ) : (
          preferitiList.map((preferito, i) => (
            <PreferitoCard preferito={preferito} key={i} />
          ))
        )}
      </Row>
    </Container>
  );
};

export default WishListComponent;
