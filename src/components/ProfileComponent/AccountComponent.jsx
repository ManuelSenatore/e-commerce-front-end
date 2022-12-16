import React from 'react'
import { Container, Col, Button, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import OrderCard from '../OrderCard';
import { useEffect } from 'react';

const AccountComponent = () => {
    const orderList = useSelector((state) => state.order.orderList);
    const navigate = useNavigate()
    const token = useSelector((state) => state.user.user.token)

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      useEffect(() => {
        if (token === undefined) {
          navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [token]);
  return (
    <Container className='pageContainer '>
      <h2 style={{fontFamily: 'fantasy'}}>Ordini effettuati</h2>
      <Row className=" d-flex flex-column-reverse">
      {
        orderList.length === 0 ? (
            <Col className="d-flex flex-column justify-content-center align-items-center ">
            <h3>Nessun ordine effettuato!</h3>{" "}
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Vai allo Shop
            </Button>{" "}
          </Col>
        ) : (
            orderList.map((order, i) => {
                return <OrderCard order={order} key={i} i={i} />
            }))
      }
      </Row>
    </Container>
  )
}

export default AccountComponent
