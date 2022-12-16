import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import 'animate.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComponents from "./components/NavBarComponents";
import { Container } from "react-bootstrap";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/ProfileComponent/LoginComponent";
import SignUpComopnent from "./components/ProfileComponent/SignUpComponent";
import WishListComponent from "./components/WishListComponent";
import CarrelloComponent from "./components/CarrelloComponent";
import SuccessComponent from "./components/pagamento/SuccessComponent";
import FailureComponent from "./components/pagamento/FailureComponent";
import CheckoutComponent from "./components/pagamento/CheckoutComponent";
import DettagliComponent from "./components/DettagliComponent";
import FooterComponent from "./components/FooterComponent";
import ScuolaComponent from "./components/FilterComponents/ScuolaComponent";
import CancelleriaComponent from "./components/FilterComponents/CancelleriaComponent";
import UfficioComponent from "./components/FilterComponents/UfficioComponent";
import TempoLiberoComponent from "./components/FilterComponents/TempoLiberoComponent";
import AccountComponent from "./components/ProfileComponent/AccountComponent";


function App() {
  return (
    <BrowserRouter>
      <NavBarComponents />
      <Container fluid className="p-0" style={{minHeight: "100vh"}}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComopnent />} />
          <Route path="/wishlist" element={<WishListComponent />} />
          <Route path="/carrello" element={<CarrelloComponent />} />
          <Route path="payment/success" element={<SuccessComponent />} />
          <Route path="payment/failure" element={<FailureComponent />} />
          <Route path="/checkout" element={<CheckoutComponent />} />
          <Route path="/dettagli:prodottoId" element={<DettagliComponent />} />
          <Route path="/scuola" element={<ScuolaComponent />} />
          <Route path="/cancelleria" element={<CancelleriaComponent />} />
          <Route path="/ufficio" element={<UfficioComponent />} />
          <Route path="/svago" element={<TempoLiberoComponent />} />
          <Route path="/account" element={<AccountComponent />} />
        </Routes>
      </Container>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
