import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row,  } from "react-bootstrap";
import ProdottoCard from "../ProdottoCard";
import { getCategoriaList } from "../../redux/actions/actions";
import BackImageComponent from "./BackImageComponent";
import FilterBar from "../FilterBar";
import OrderByComponent from "../OrderByComponent";

// COMPONENTE CATEGORIA CANCELLERIA

const CancelleriaComponent = () => {
  const categoriaList = useSelector((state) => state.categoria.categoriaList);
  const dispatch = useDispatch();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getCategoriaList("CANCELLERIA"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackImageComponent />
      <FilterBar />
      <OrderByComponent />
      <Container>
        <Row className="display-flex justify-content-beetween">
          {categoriaList.map((prodotto, i) => (
            <ProdottoCard key={i} prodotto={prodotto} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CancelleriaComponent
