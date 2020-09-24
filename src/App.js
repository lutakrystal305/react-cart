import React, { useContext } from "react";
import Login from "./components/Login/index";
import HomeN from "./components/HomeN";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Product from './product/Product';
import Cart from './components/Cart';
import Profile from './components/Profile';
import { AuthProvider } from "./components/context/Auth.Context";
import { CartProvider } from "./components/context/Cart.Context";
import { PurchaseProvider } from "./components/context/Purchase.Context";
import { ProductProvider } from './components/context/Product.Context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

export default function App() {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  const loggin = localStorage.getItem("key");
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <div className='App'>
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
              <PrivateRoute path="/creator">
                <Home />
              </PrivateRoute>
              {user?
                <PrivateRoute exact path={`/${user._id}`}>
                  <Profile />
                </PrivateRoute>
              : ''
              }
              <PrivateRoute exact path="/product">
                <ProductProvider>
                  <Product />
                </ProductProvider>
              </PrivateRoute>
              <PurchaseProvider>
                <PrivateRoute path="/cartShopping">
                  <Cart />
                </PrivateRoute>
              </PurchaseProvider>
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
