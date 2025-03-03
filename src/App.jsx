import { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Navbar from "./Components/Shared/Navbar";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Auth/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Register from "./Components/Auth/Register";
import Checkout from "./Components/Checkout/Checkout";
import PaymentConfirmation from "./Components/Checkout/PaymentConfirmation";

function App() { 
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route  element={<PrivateRoute />} >
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/order-confirm" element={<PaymentConfirmation/>}/>
          </Route>
          <Route  element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </Fragment>
  );
}

export default App;
