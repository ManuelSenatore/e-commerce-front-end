import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ButtonAcquistaComponent from "./ButtonAcquistaComponent";
import LikeComponent from "./LikeComponent";
import ReactImageMagnify from 'react-image-magnify';

// PAGINA PER I DETTAGLI DEL PRODOTTO DOVE è STATO UTILIZZATA UNA LIBRERIA PER FARE LO ZOOM SULL'IMMAGINE

const DettagliComponent = () => {
  const [data, setData] = useState(null);
  const params = useParams();

  const getDettagliProdotto = async () => {
    try {
      let response = await fetch(
        `http://localhost:8080/api/prodotti/${params.prodottoId} `
      );
      if (response.ok) {
        let prodotto = await response.json();
        setData(prodotto);
      } else {
        console.log("qualcosa è andato storto");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getDettagliProdotto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="pageContainer">
      {data && (
        <Row>
          <Col
            style={{zIndex: 2}}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            className="d-flex justify-content-center align-items-center p-0"
          >
             <ReactImageMagnify {...{
                         smallImage: {
                            alt: 'Prodotto',
                            isFluidWidth: true,
                            src: data.immagineUrl,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        largeImage: {
                            src: data.immagineUrl,
                            width: 1200,
                            height: 1400
                        },
                        enlargedImageContainerDimensions: {
                            width: '120%',
                            height: '100%'
                        }
                    }} />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={6}
            className="d-flex flex-column justify-content-center align-items-center p-0 "
          >
            <h2>{data.nome}</h2>
            <span
              className="align-self-start mt-3 mb-3"
              style={{ color: "green", fontWeight: "bolder" }}
            >
              {data.prezzo.toString().split(".")[0]},
              {data.prezzo.toString().split(".")[1]
                ? data.prezzo.toString().split(".")[1].slice(0, 2).length === 1
                  ? data.prezzo.toString().split(".")[1].slice(0, 2) + "0"
                  : data.prezzo.toString().split(".")[1].slice(0, 2) + ""
                : "00"}{" "}
              €
            </span>
            <p>{data.descrizione}</p>
            <div
              style={{ width: "100%" }}
              className="d-flex align-items-center justify-content-evenly mb-4"
            >
              <div className="divRelative">
                <LikeComponent prodotto={data} />
              </div>

              <ButtonAcquistaComponent prodotto={data.id} />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DettagliComponent;
