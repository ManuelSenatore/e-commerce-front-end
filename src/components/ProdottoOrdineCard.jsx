import React from 'react'
import { Col, Card } from 'react-bootstrap'

// CARD PRODOTTO UTILIZZATA NELL ORDINE

const ProdottoOrdineCard = (props) => {
  return (
    <Col className="mb-3" xs={12}>
      <Card
        className="cardProdotto cardCarrello d-flex flex-row align-items-center"
        key={props.i}
        style={{ width: 100 + "%" }}
      >
        <div style={{ width: "10rem" }}>
          <Card.Img
            variant="top"
            src={props.elemento.prodotto.immagineUrl}
          />
        </div>
        <Card.Body>
          <Card.Title className="mt-2">
            {props.elemento.prodotto.nome}
          </Card.Title>
          <Card.Text>Quantità: {props.elemento.quantity}</Card.Text>
          <Card.Text className="flex-end" style={{ fontWeight: "bolder" }}>
            {props.elemento.prodotto.prezzo.toString().split(".")[0]},
            {props.elemento.prodotto.prezzo.toString().split(".")[1]
              ? props.elemento.prodotto.prezzo
                  .toString()
                  .split(".")[1]
                  .slice(0, 2).length === 1
                ? props.elemento.prodotto.prezzo
                    .toString()
                    .split(".")[1]
                    .slice(0, 2) + "0"
                : props.elemento.prodotto.prezzo
                    .toString()
                    .split(".")[1]
                    .slice(0, 2) + ""
              : "00"}{" "}
            €
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProdottoOrdineCard
