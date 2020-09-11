import React, { useState, useEffect, useContext } from "react";
import './Navbar.css';
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

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuth, checkLoggin } = useContext(AuthContext);
  const { cartItem } = useContext(CartContext);

  const history = useHistory();
  const data = sessionStorage.getItem('cartItem');
  const toggle = () => setIsOpen(!isOpen);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthen = localStorage.getItem("key") || isAuth;
  var cartItemS;
  if (cartItem.length !== 0) {
    cartItemS = cartItem;
  } else if (data){
    cartItemS = JSON.parse(data);
  } else {
    cartItemS = [];
  }
  const signOut = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    checkLoggin(token)
  })

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Krystal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="Top">
              <Link to="/home" className='Linkz'>Home</Link>
            </NavItem>
            <NavItem className="Top">
              <Link to="/product?page=1" className='Linkz'>Product</Link>
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
          <NavbarText>{user ? user.name : "Anonymous"}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
