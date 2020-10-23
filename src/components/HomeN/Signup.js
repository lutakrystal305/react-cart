import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Alert from "../bootstrap/Alert";

import "./Signup.css";

function Signup() {

  const [valueName, setValueName] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valuePhone, setValuePhone] = useState('');
  const [valueAdd, setValueAdd] = useState('');
  const [isErrName, setIsErrName] = useState(false);
  const [isErrEmail, setIsErrEmail] = useState(false);
  const [isErrPassword, setIsErrPassword] = useState(false);
  const [isErrAdd, setIsErrAdd] = useState(false);
  const [isErrCreate, setIsErrCreate] = useState(false);
  const [msgErr, setMsgErr] = useState('');

  const history = useHistory();

  const handleChangeName = (event) => {
    const value = event.target.value;
    setValueName(value);
  }
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setValueEmail(value);
  }
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setValuePassword(value);
  }
  const handleChangePhone = (event) => {
    const value = event.target.value;
    setValuePhone(value);
  }
  const handleChangeAdd = (event) => {
    const value = event.target.value;
    setValueAdd(value);
  }
  const check = (value) => {
    for (let i=0; i< 10; i++) {
      if (value.indexOf(i) >0) {
        setIsErrName(true);
      }
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    check(valueName);
    if (valueName.length < 2) {
      setIsErrName(true);
    } else if (
      (valueEmail.indexOf('@gmail.com') <0)
      || (valueEmail.indexOf(' ') >0)
      ||(valueEmail.length < 13)) {
        setIsErrEmail(true);
        setMsgErr('Email was wrong syntax ( ...@gmail.com, > 13 character)!')
    } else if ((valuePassword.indexOf(' ') >0)||(valuePassword.length <6)) {
      setIsErrPassword(true);
      setMsgErr('Password was wrong syntax!')
    } else if (valueAdd.length <3) {
      setIsErrAdd(true);
      setMsgErr('Address was wrong syntax!')
    } else {
      const user = {
        name: valueName,
        email: valueEmail,
        password: valuePassword,
        phone: valuePhone,
        add: valueAdd
      };
      axios
        .post("http://localhost:8080/user/create", user)
        .then((res) => {
          setValueName("");
          setValueEmail("");
          setValuePassword("");
          setValuePhone("");
          setValuePassword("");
          history.push("/login");
        })
        .catch((err) => {
          if (err.response === undefined) {
            alert(err);
          } else if (err.response.status === 401) {
            setIsErrCreate(true);
            setMsgErr(err.response.data.msg);
          }
        });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {isErrCreate ? <Alert>{msgErr}</Alert> : ''}
      {isErrName ? <Alert>{msgErr}</Alert> : ""}
      {isErrEmail ? <Alert>{msgErr}</Alert> : ""}
      {isErrPassword ? <Alert>{msgErr}</Alert> : ""}
      {isErrAdd ? <Alert>{msgErr}</Alert> : ""}
      <h3>Register</h3>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={valueName}
          onChange={handleChangeName}
          placeholder="What is your name?"
          pattern="[^()/><\][\\\x22,;|]+"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="email"
          value={valueEmail}
          onChange={handleChangeEmail}
          placeholder="abc123@gmail.com"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          value={valuePassword}
          onChange={handleChangePassword}
          placeholder="Password"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="phone"
          value={valuePhone}
          onChange={handleChangePhone}
          placeholder="Number phone"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="Address"
          value={valueAdd}
          onChange={handleChangeAdd}
          placeholder="province(city), country"
          pattern="[a-zA-Z]*"
          required
        />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}
export default Signup;
