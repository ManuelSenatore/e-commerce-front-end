import React from "react";
import papyrus from "../img/papyrus.png";
import { Container, Row, Col } from "react-bootstrap";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";

// FOOTER DELLA PAGINA

const FooterComponent = () => {
  return (
    <>
      <Container>
        <Row className="d-flex flex-wrap justify-content-evenly pt-5 borderFooter mt-3">
          <Col xs={12}
            sm={12}
            md={4}
            lg={4} className="d-flex flex-column align-items-center">
            <img
              style={{ height: "5rem" }}
              className=" mb-4"
              src={papyrus}
              alt="logo"
            />
            <small className="text-center mb-4">
              Papyrus è un marchio registrato <br /> con sede legale in Via
              Clemente Tafuri, 5 <br /> 84013 Cava De Tirreni SA <br /> P.I.
              12657648964
            </small>
          </Col>
          <Col xs={12}
            sm={12}
            md={4}
            lg={4} className="d-flex flex-column align-items-center ">
            <h5 className="text-center">Orari</h5>
            <p>Lun: 8:00 - 13:30 / 17:00 - 20:30</p>
            <p>Mar: 8:00 - 13:30 / 17:00 - 20:30</p>
            <p>Mer: 8:00 - 13:30 / 17:00 - 20:30</p>
            <p>Gio: 8:00 - 13:30 / 17:00 - 20:30</p>
            <p>Ven: 8:00 - 13:30 / 17:00 - 20:30</p>
            <p>Sab: 8:30 - 13:00 / 17:00 - 20:00</p>
            <p>Dom: Chiuso</p>
          </Col>
          <Col xs={12}
            sm={12}
            md={4}
            lg={4} className="d-flex flex-column align-items-center ">
            <h5 className="text-center">Contatti</h5>
            <p>Tel: 089442926</p>
            <p>Papyruscartoleria@virgilio.it</p>
            <div>
              <IconButton
                type="link"
                href="https://www.facebook.com/cartoleria.papyrus"
                target="blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                type="link"
                href="https://www.instagram.com/cartoleriapapyrus"
                target="blank"
              >
                <InstagramIcon color="red" />
              </IconButton>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="footer">
          <p style={{ color: "white" }} className="text-center pt-2">
            Copyright © 2022 Papyrus Cartoleria - Tutti i diritti riservati
          </p>
        </Row>
      </Container>
    </>
  );
};

export default FooterComponent;
