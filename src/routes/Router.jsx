import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cart" element={<CartPage />} /> 
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/signup" element={<SignUpPage />} /> 
      <Route path="/order" element={<OrderPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
