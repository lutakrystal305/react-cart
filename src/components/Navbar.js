import React, { useState, useEffect, useContext } from "react";
import './Navbar.css';
import classNames from 'classnames';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from './context/Auth.Context';
import { CartContext } from './context/Cart.Context';
import avt from './img/avt.png';
import Drawer from './material-ui/Drawer';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const { isAuth, checkLoggin } = useContext(AuthContext);
  const { cartItem } = useContext(CartContext);

  const history = useHistory();
  const data = sessionStorage.getItem('cartItem');
  const toggle = () => setIsOpen(!isOpen);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthen = localStorage.getItem("key") || isAuth;

  const handleOver = () => {
    setHover(true)
  }
  const handleOut = () => {
    setHover(false)
  }
  var cartItemS;
  if (cartItem.length !== 0) {
    cartItemS = cartItem;
  } else if (data){
    cartItemS = JSON.parse(data);
  } else {
    cartItemS = [];
  }
  const signOut = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem('token')) {
      localStorage.removeItem("key");
      if (!localStorage.getItem('key')) {
        localStorage.removeItem("user");
      }
    }
    history.push("/");
    window.location.reload();
  }

  return (
    <div className='d-Navbar'>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Krystal</NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="Top">
              <Link to="/home" className='Linkz'>Home</Link>
            </NavItem>
            <NavItem className="Top">
              <Link to="/product" className='Linkz'>Product</Link>
            </NavItem>
            <NavItem className="Top">
              <Link to="/cartShopping" className='Linkz'>Cart({cartItemS.length})</Link>
            </NavItem>
            {isAuth ? (
              <NavItem className="Top">
                <button onClick={signOut}><b>Log out...</b></button>
              </NavItem>
            ) : (
              <Link to="/login" className='Linkz Top'><b> Login </b></Link>
            )}
          </Nav>
          
        </Collapse>
        <NavbarText>
          <div className='user'>
            <Drawer user={user}/>
          </div>
        </NavbarText>
      </Navbar>
    </div>
  );
};

export default Example;
