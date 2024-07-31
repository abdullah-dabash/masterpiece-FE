import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./Register/LogIn";
import SignUp from "./Register/SignUp";
import ContactUs from "./contact/ContactUs";
import ProductComponent from "./productDetails/product";
import CartComponent from "./cart";
import Favorites from "./favorite";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/cart" element={<CartComponent/>} />
        <Route path="/contact/ContactUs" element={<ContactUs />} />
        <Route path="/productDetails/product" element={<ProductComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;