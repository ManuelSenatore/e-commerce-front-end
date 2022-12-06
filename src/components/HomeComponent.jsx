import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProdottoList } from "../redux/actions/actions";
import CarouselComponents from "./CarouselComponents";
import FilterBar from "./FilterBar";
import MapsComponent from "./MapsComponent";
import ProdottoCard from "./ProdottoCard";

const HomeComponent = () => {
  const prodottoList = useSelector((state) => state.prodotto.prodottoList);
  const dispatch = useDispatch();
  const [ultimiArrivi, setUltimiArrivi] = useState(prodottoList.slice(-15, prodottoList.length).reverse());

  useEffect(() => {
    dispatch(getProdottoList());
    console.log(prodottoList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CarouselComponents />
      <FilterBar />
      <Container>
        <h2 className="text-center">Ultimi Arrivi</h2>
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
