import React, { useState, useEffect } from "react";
import Login from "./components/Login/index";
import HomeN from "./components/HomeN";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Product from './product/Product';
import { AuthProvider } from "./components/context/Auth.Context";
import { CartProvider } from "./components/context/Cart.Context";
import { ProductProvider } from './components/context/Product.Context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  //useEffect(() => {
  //checkLoggin();
  //})
  const loggin = localStorage.getItem("key");
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <HomeN />
              </Route>
              <Route path="/login">
                {loggin ? <Redirect to="/home" /> : <Login />}
              </Route>
              <PrivateRoute path="/home">
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path="/product">
                <ProductProvider>
                  <Product />
                </ProductProvider>
              </PrivateRoute>
            </Switch>
          </div>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}
