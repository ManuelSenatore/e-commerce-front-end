import { Button } from "@mui/material";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCarrelloList, setOrderList } from "../../redux/actions/actions";

// COMPONENTE DOVE SI VIENE INDIRIZZATI NEL CASO DI PAGAMENTO CON SUCCESSO CHE SI OCCUPA DI SVUOTARE IL CARRELLO E SALVARE L'ORDINE EFFETTUATO NELLA PROFILO DEL CLIENTE

const SuccessComponent = () => {
  const navigate = useNavigate();
  const carrelloList = useSelector((state) => state.carrello.carrelloList);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.user.token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (token === undefined) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
        console.log(data);
        dispatch(getCarrelloList(token, user.id));
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setOrderList(carrelloList));
    carrelloList.cartItems.forEach((element) => {
      removeToCarrello(element.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="pageContainer">
      <Row>
        <Col>
          <div className="text-center">
            <h2>PAGAMENTO EFFETTUATO CON SUCCESSO</h2>
            <Button onClick={() => navigate("/")}>Torna alla Home</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessComponent;
