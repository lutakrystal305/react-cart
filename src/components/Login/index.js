import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';

import Alert from "../bootstrap/Alert";
import './Login.css';
import { AuthContext } from '../context/Auth.Context';

import bg2 from '../img/bg2.png';
import frame from '../img/frame.png';
import bgzz from '../img/bgzz.png';
import pug1 from '../img/pug1.png';

export default function Login(props) {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [isErrEmail, setIsErrEmail] = useState(false);
  const [isErrPassword, setIsErrPassword] = useState(false);
  const [msgErr, setMsgErr] = useState("");
  const [msgErrEmail, setMsgErrEmail]= useState('');
  const [msgErrPass, setMsgErrPass] = useState('');
  const [isErrLogin, setIsErrLogin] = useState(false);

  const { isAuth, checkLoggin } = useContext(AuthContext);

  let history = useHistory();

  
  const checkEmail = () => {
    if ((valueEmail.length < 13) || (valueEmail.indexOf('@gmail.com') < 0) || (valueEmail.indexOf(' ') >0)) {
      setIsErrEmail(true);
      setMsgErrEmail('Email was wrong syntax (...@gmail.com, >13 character)!')
    }
  }
  const checkPass = () => {
    if ((valuePassword.length < 6)||(valuePassword.indexOf(' ') > 0)) {
      setIsErrPassword(true);
      setMsgErrPass('Password was wrong syntax (>6 character)!')
    }
  }

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
    checkEmail();
    checkPass();
    if (!isErrEmail || !isErrPassword) {
      const user = {
        email: valueEmail,
        password: valuePassword
      };
      axios
        .post("https://amber-api.herokuapp.com/user/login", user)
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
    }
    
  };
  const responseFacebook = (response) => {
    
    if (response.accessToken) {
      sessionStorage.setItem('accessToken', response.accessToken.toString());
      const user = {
        email: response.email,
        name: response.name,
        phone: response.phone,
        urlAvt: response.picture.data.url,
        userID: response.id
      };
      axios
        .post("https://amber-api.herokuapp.com/user/loginFB", user)
        .then((res) => {
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
    }
  }
  useEffect(() => {
    document.title = 'Login'
  }, [])
  return (
    <div className='Login'>
      {isErrLogin ? 
        <Alert>{msgErr}</Alert>
        : ''
      }
      {isErrPassword ?
        <Alert>{msgErrPass}</Alert>
        : ''
      }
      {isErrEmail ?
        <Alert>{msgErrEmail}</Alert>
        : ''
      }
      <div className='top-scene'>
        <img src={bgzz} alt='top-scene' />
      </div>
      <div className='left-scene'>
        <img src={bg2} alt='left-scene' />
      </div>
      <div className='right-scene'>
        <img src={frame} alt='right-scene' />
      </div>
      <div className="d-login" >
        <div className='bg-login'>
          <img src={pug1} alt='bg-login' />
        </div>
        <form onSubmit={handleSubmit} id="form-login">
          {isErrEmail ? <Alert>Email was wrong syntax</Alert> : ""}
          {isErrPassword ? <Alert>Password was wrong syntax</Alert> : ""}
          <div className='logo'>
           <img src={pug1} alt='logo-login' />
          </div>
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
          <button type="submit" className="btn-login">Login</button>
          <Link to='/' className="link-signup">Sign up</Link>
          <FacebookLogin
            appId="354367609113091" //APP ID NOT CREATED YET

            fields="name,email,picture"
            callback={responseFacebook}
            disableMobileRedirect={false}
            isMobile={false}
            icon="fa-facebook"
          />
        </form>
      </div>
    </div>
  );
}
