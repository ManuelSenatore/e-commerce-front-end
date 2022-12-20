import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProdottoList } from "../redux/actions/actions";
import CarouselComponents from "./CarouselComponents";
import FilterBar from "./FilterBar";
import MapsComponent from "./MapsComponent";
import ProdottoCard from "./ProdottoCard";

// HOME DELLA PAGINA

const HomeComponent = () => {
  const prodottoList = useSelector((state) => state.prodotto.prodottoList);
  const dispatch = useDispatch();
  const [ultimiArrivi, setUltimiArrivi] = useState(
    prodottoList.slice(-15, prodottoList.length).reverse()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    dispatch(getProdottoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CarouselComponents />
      <FilterBar />
      <Container>
        <h1 className="text-center titlePage" style={{fontFamily: 'fantasy'}}>Ultimi Arrivi</h1>
        <Row className="display-flex justify-content-beetween">
          {ultimiArrivi.map((prodotto, i) => (
            <ProdottoCard key={i} prodotto={prodotto} />
          ))}
        </Row>
      </Container>
      <MapsComponent />
    </>
  );
};

export default HomeComponent;
