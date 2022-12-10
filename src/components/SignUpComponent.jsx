import React, { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form
    nomeCompleto: "",
    username: "",
    email: "",
    password: "",
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

  const signUp = async (obj) => {
    const baseEndpoint = "http://localhost:8080/api/users/new-raw";

    const header = {
      "Content-type": "application/json",
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "POST",
        headers: header,
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/login");
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="backgroundContainer">
      <Card style={{ width: "20rem" }} className="cardLogin">
        <Card.Header className="text-center">SIGNUP</Card.Header>
        <Card.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signUp(formObj);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicNomeCompleto">
              <Form.Label>Nome e cognome</Form.Label>
              <Form.Control
                value={formObj.nomeCompleto}
                onChange={(e) => handleForm("nomeCompleto", e.target.value)}
                type="text"
                placeholder="Inserisci nome"
                required= "true"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={formObj.username}
                autoComplete="current-password"
                onChange={(e) => handleForm("username", e.target.value)}
                type="text"
                placeholder="Inserisci username"
                required= "true"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Indirizzo email</Form.Label>
              <Form.Control
                value={formObj.email}
                onChange={(e) => handleForm("email", e.target.value)}
                type="email"
                placeholder="Inserisci la tua email"
                required= "true"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formObj.password}
                onChange={(e) => handleForm("password", e.target.value)}
                type="password"
                placeholder="Inserisci Password"
                autoComplete="current-password"
                required= "true"
              />
            </Form.Group>
            <Button
              className={"w-100 d-block mx-auto mt-4"}
              variant="primary"
              type="submit"
            >
              REGISTRATI
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUpComponent;
