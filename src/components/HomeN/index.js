import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Unloggin from "./Unloggin";
import { AuthContext } from '../context/Auth.Context';
import { CartContext } from '../context/Cart.Context';
import Logged from './Logged.js';
import forest from '../img/forest.jpg';
import './HomeN.css';

function HomeN() {
  const { isAuth, checkLoggin } = useContext(AuthContext);
  const { users, getUsers } = useContext(CartContext);
  const isAuthen = localStorage.getItem("key") || isAuth;
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    checkLoggin(token);
    getUsers();
  },[]);
  return (
    <div className="HomeN">
      <div className='bg-homeN'>
        <div className='bg-opacity'></div>
        <img src={forest} alt='bg' />
      </div>
      {isAuthen ?
      <Logged />
      : <Unloggin />
      }
    </div>
  );
}
export default HomeN;
