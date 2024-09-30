import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; 
import Home from "./HomePage/Home";
import Login from "./Register/LogIn";
import SignUp from "./Register/SignUp";
import ContactUs from "./contact/ContactUs";
import ProductList from "./productDetails/ProductList";
import ProductDetail from "./productDetails/ProductDetail";
import CartComponent from "./cart";
import Favorites from "./favorite";
import Profile from "./UserProfile/profile";
import RoomRenovation from "./room/renovation";
import Room from "./room";
import PaymentPage from "./Payment";
import ConfirmationPage from "./ConfirmationPage";
import HighEndAboutUs from "./aboutUs";
const initialOptions = {
  clientId: "AeahpM50Kr_kMyF07toqJO55ur9-0gGOozGdHeMwJ9IQ_G3Xob_2T2Gg1sthPUGC5rTeRyVH9-E9VfVG", 
  currency: "USD" 
};
function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/room" element={<Room />} />
          <Route path="/contact/ContactUs" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/room/renovation" element={<RoomRenovation />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
          <Route path="/aboutUs" element={<HighEndAboutUs />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
