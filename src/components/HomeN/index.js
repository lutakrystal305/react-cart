import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Unloggin from "./Unloggin";
import { AuthContext } from '../context/Auth.Context';

function HomeN() {
  const { isAuth, checkLoggin } = useContext(AuthContext);
  const isAuthen = localStorage.getItem("key") || isAuth;
  const token = localStorage.getItem("token");

  useEffect(() => {
    checkLoggin(token)
  });
  return (
    <div className="HomeN">{isAuthen ? <h2>welcome</h2> : <Unloggin />}</div>
  );
}
export default HomeN;
