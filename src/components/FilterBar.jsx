import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// COMPONENTE CHE RIGUARDA IL FILTRAGGIO DELL'ARRAY CONTENUTO NELLE CATEGORIE

const FilterBar = () => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row className="filterRow display-flex mb-5">
        <Col onClick={() => navigate("/scuola")} className="p-0">
          <h5 className="hvr-underline-from-center w-100 text-center mt-2">
            SCUOLA
          </h5>
        </Col>

        <Col onClick={() => navigate("/cancelleria")} className="p-0">
          <h5 className="hvr-underline-from-center1 w-100 text-center mt-2">
            CANCELLERIA
          </h5>
        </Col>
        <Col onClick={() => navigate("/ufficio")} className="p-0">
          <h5 className="hvr-underline-from-center2 w-100 text-center mt-2">
            UFFICIO
          </h5>
        </Col>
        <Col onClick={() => navigate("/svago")} className="p-0">
          <h5 className="hvr-underline-from-center3 w-100 text-center mt-2">
            SVAGO
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterBar;
