import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

// COMPONENTE CHE SI OCCUPA DI EFFETTUARE L'INDIRIZZAMENTO AL PAGAMENTO STRIPE TRAMITE IL CARRELLO DEL CLIENTE E UNA FETCH EFFETTUATA CON AXIOS

const CheckoutComponent = () => {
  const carrelloList = useSelector((state) => state.carrello.carrelloList);
  const token = useSelector((state) => state.user.user.token);
  const [stripeAPIToken, setStripeAPIToken] = useState(
    "pk_test_51MAZRAGV0q5KZpMHJTZNyI5J3jePtF1Q2mTv2zyGFZnRuseaVlbUTSi1ab8mEBx046lfHkIrgONmyllDOVsPbCbs00SHEqnQaJ"
  );
  const [checkoutBodyArray, setCheckoutBodyArray] = useState([]);
  const [stripe, setStripe] = useState(window.Stripe(stripeAPIToken));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  for (let i = 0; i < carrelloList.cartItems.length; i++) {
    checkoutBodyArray.push({
      price: carrelloList.cartItems[i].prodotto.prezzo,
      quantity: carrelloList.cartItems[i].quantity,
      productName: carrelloList.cartItems[i].prodotto.nome,
      productId: carrelloList.cartItems[i].prodotto.id,
    });
  }

  const goToCheckout = () => {
    console.log(checkoutBodyArray);
    axios
      .post(
        `http://localhost:8080/order/create-checkout-session`,
        checkoutBodyArray,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        localStorage.setItem("sessionId", response.data.sessionId);
        console.log("session", response.data);
        stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="pageContainer">
      <div className="text-center">
        <h3>Ora verrai reindirizzato alla pagina del pagamento</h3>
        <div className="alert alert-primary">
          Per autorizzare il pagamento usa il numero carta 4242 4242 4242 4242
          con il cvv e la data random
        </div>
        <Button onClick={() => goToCheckout()}>Vai al pagamento</Button>
      </div>
    </Container>
  );
};

export default CheckoutComponent;
