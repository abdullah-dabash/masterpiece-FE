import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./Register/LogIn";
import SignUp from "./Register/SignUp";
import ContactUs from "./contact/ContactUs";
import ProductList from "./productDetails/ProductList"; // Make sure this path is correct
import ProductDetail from "./productDetails/ProductDetail"; // Make sure this path is correct
import CartComponent from "./cart";
import Favorites from "./favorite";
import Profile from "./UserProfile/profile";
import RoomRenovation from "./room/renovation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route path="/contact/ContactUs" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room/renovation" element={<RoomRenovation />} />
        <Route path="/products" element={<ProductList />} /> {/* Updated route for product list */}
        <Route path="/product/:id" element={<ProductDetail />} /> {/* Route for product details */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
