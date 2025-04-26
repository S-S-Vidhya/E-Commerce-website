import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Collection from "./component/Collection";
import Cart from "./component/Cart";
import Wishlist from "./component/Wishlist";
import NewArrivals from "./component/NewArrivals";
import Offers from "./component/Offers";
import Checkout from "./component/Checkout";
import Orders from "./component/Orders";
import LoginPage from "./component/LoginPage";
import SignUpPage from "./component/SignUpPage";

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/newarrivals" element={<NewArrivals />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

    </Router>
  );
};

export default App;
