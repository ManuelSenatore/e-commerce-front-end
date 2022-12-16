import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Col, Container, Row, Spinner } from "react-bootstrap";

// COMPONENTE DOVE è STATO UTILIZZATO GOOGLE MAPS

const MapsComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_MAP_API_KEY,
  });

  if (!isLoaded) return <Spinner />;
  return (
    <Container fluid>
      <Row
        className="d-flex justify-content-evenly"
        style={{ backgroundColor: "red" }}
      >
        <Col className="p-0" lg={6} md={6} xs={12}>
          <Map />
        </Col>
        <Col
          className=" d-flex flex-column justify-content-center align-items-center p-0"
          lg={6}
          md={6}
          xs={12}
        >
          <h2 className="text-center p-2" style={{ color: "white" }}>
            VIENI A TROVARCI !
          </h2>
          <h6 className="text-center p-1" style={{ color: "white" }}>
            Siamo a via Clemente Tafuri 5 Cava De Tirreni SA
          </h6>
        </Col>
      </Row>
    </Container>
  );
};
function Map() {
  const [ selected , setSelected ] = React.useState ( null );
  const center = useMemo(() => ({ lat: 40.7067704, lng: 14.7015501 }), []);
  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName="map-container">
      <Marker
        position={center}
        title="Cartoleria Papyrus"
        onClick={() => {
          setSelected(center)
        }}
      />
      {selected ? (
        <InfoWindow
          position={center}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h6>Visualizza su Google Maps</h6>
            <a className="d-block text-center" href="https://www.google.it/maps/place/Papyrus+Cartoleria/@40.7067664,14.7015448,17z/data=!3m1!4b1!4m5!3m4!1s0x133bc0e2c18d65a3:0x22b4a3d09ec5c866!8m2!3d40.7067664!4d14.7037388" target="_blank" rel="noreferrer">Clicca qui</a>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}

export default MapsComponent;
