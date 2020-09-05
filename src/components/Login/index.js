import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import Alert from "../bootstrap/Alert";
import './Login.css';
import { AuthContext } from '../context/Auth.Context';

export default function Login(props) {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [isErrEmail, setIsErrEmail] = useState(false);
  const [isErrPassword, setIsErrPassword] = useState(false);
  const [msgErr, setMsgErr] = useState("");
  const [isErrLogin, setIsErrLogin] = useState(false);

  const { isAuth, checkLoggin } = useContext(AuthContext);

  let history = useHistory();

  

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setValueEmail(value);
  };
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setValuePassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const user = {
      email: valueEmail,
      password: valuePassword
    };
    axios
      .post("http://localhost:8080/user/login", user)
      .then((res) => {
        setValueEmail("");
        setValuePassword("");
        if (res.data.token) {
          localStorage.setItem("token", res.data.token.toString());
        }
        checkLoggin(res.data.token);
        history.push('/')        
      })
      .catch((err) => {
        if (err.response === undefined) {
          alert(err);
        } else if (err.response.status === 401) {
          setIsErrLogin(true);
          setMsgErr(err.response.data.msg);
        }
      });
    
  };
  
  return (
    <form onSubmit={handleSubmit} id="form-login">
      {isErrEmail ? <Alert>Email was wrong syntax</Alert> : ""}
      {isErrPassword ? <Alert>Password was wrong syntax</Alert> : ""}
      <h3>Sign in!!</h3>
      <div className="form-group">
        <input
          type="text"
          name="email"
          value={valueEmail}
          onChange={handleChangeEmail}
          placeholder="  Email"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          value={valuePassword}
          onChange={handleChangePassword}
          placeholder="  Password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
