import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCategoriaList, orderingCategoriaList } from "../redux/actions/actions";
import { useLocation } from "react-router-dom";

// COMPONENTE UTILIZZATO NELLE PAGINE CATEGORIA CHE AL CLICK CAMBIA L'ORDINE DEI PRODOTTI

const OrderByComponent = () => {
  const categoriaList = useSelector((state) => state.categoria.categoriaList);
  const dispatch = useDispatch();
  const location = useLocation();

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form
    value: "",
  });

  const handleForm = (key, value) => {
    // setta l'oggetto del form
    setFormObj((form) => {
      return {
        ...form,
        [key]: value,
      };
    });
  };
  useEffect(() => {
    if(location.pathname === "/cancelleria"){
        dispatch(getCategoriaList("CANCELLERIA"))
      }
      else if(location.pathname === "/ufficio"){
        dispatch(getCategoriaList("UFFICIO"))
      }
      else if(location.pathname === "/svago"){
        dispatch(getCategoriaList("TEMPO_LIBERO"))
      }
      else if(location.pathname === "/scuola"){
        dispatch(getCategoriaList("SCUOLA"))
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(location.pathname === "/cancelleria"){
        dispatch(orderingCategoriaList("CANCELLERIA", formObj.value))
      }
      else if(location.pathname === "/ufficio"){
        dispatch(orderingCategoriaList("UFFICIO", formObj.value))
      }
      else if(location.pathname === "/svago"){
        dispatch(orderingCategoriaList("TEMPO_LIBERO", formObj.value))
      }
      else if(location.pathname === "/scuola"){
        dispatch(orderingCategoriaList("SCUOLA", formObj.value))
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formObj.value])

  return (
    <Container>
      <Row className="orderingBar mb-2">
        <Col>
          <h6>Prodotti: {categoriaList.length}</h6>
        </Col>
        <Col className="d-flex justify-content-flex-end">
          <Form.Group>
            <Form.Select
            style={{width: '200px',}}
              onChange={(e) => handleForm("value", e.target.value)}
            >
              <option value={""}>Ordina per:</option>
              <option value={"nomeDesc"}>
                Ordine alfabetico Z-A 
              </option>
              <option value={"nomeAsc"}>Ordine alfabetico A-Z </option>
              <option value={"prezzoAsc"}>Prezzo crescente </option>
              <option value={"prezzoDesc"}>Prezzo decrescente </option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderByComponent;
