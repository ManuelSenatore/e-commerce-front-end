import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/actions/actions";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { Alert } from "@mui/material";

function LoginComponent() {
  const user = useSelector((state) => state.user.user);

  const loginFlag = useSelector((state) => state.user.loginFlag);
  const dispatch = useDispatch(); // REDUX

  const navigate = useNavigate();

  const clientId = process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientId,
      });
    };
    gapi.load("client: auth2", start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSuccess = (response) => {
    const userDataSignup = {
      nomeCompleto: response.profileObj.name,
      username: response.profileObj.email,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    };
    try {
      signUp(userDataSignup).then(() => {
        //LOGIN
        const userDataLogin = {
          username: response.profileObj.email,
          password: response.profileObj.googleId,
        };
        console.log(userDataLogin);
        dispatch(logIn(userDataLogin));
      });
    } catch (e) {
      console.log("ok");
    }
  };

  const onFailure = (response) => {
    console.log("Qualcosa è andato storto");
  };

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form
    username: "",
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

  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user.token]);

  return (
    <Container fluid className=" backgroundContainer">
      <Card className="cardLogin" style={{ width: "20rem" }}>
        <Card.Header className="text-center">LOGIN</Card.Header>
        <Card.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(logIn(formObj));
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome utente</Form.Label>
              <Form.Control
                value={formObj.username}
                onChange={(e) => handleForm("username", e.target.value)}
                type="text"
                autoComplete="current-password"
                placeholder="Inserisci il nome utente"
                required="true"
              />
              <Form.Text className="text-muted">
                Non condividere mai la password con nessuno.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formObj.password}
                onChange={(e) => handleForm("password", e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="Inserisci la tua password"
                required="true"
              />
            </Form.Group>
            {loginFlag && (
              <Alert severity="error">Nome utente o password errata</Alert>
            )}
            <Button
              className={"w-100 d-block mx-auto my-4"}
              variant="primary"
              type="submit"
            >
              ACCEDI
            </Button>
            <GoogleLogin
              className={"w-100"}
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_policy"}
            />
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          <Link to={"/signup"}>Se non sei registrato clicca qui</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default LoginComponent;
