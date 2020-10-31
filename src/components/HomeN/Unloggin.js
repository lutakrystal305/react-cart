import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "../bootstrap/Alert";
import Signup from "./Signup";
import './Signup.css';

function Unloggin() {
  useEffect(() => {
    document.title = "Amber( not logged)"
  },[])
  return (
    <div className="Unloggin">
      <h2>
        <span>You are not logged in, you can try </span>
        <Link to="./login">Login</Link>
      </h2>
      <Signup />
    </div>
  );
}
export default Unloggin;
