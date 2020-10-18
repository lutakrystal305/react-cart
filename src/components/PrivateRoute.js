import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from './context/Auth.Context';

function PrivateRoute({ children, ...rest }) {
  const { isAuth, checkLoggin } = useContext(AuthContext);
  const isAuthen= localStorage.getItem('key') || isAuth;
  const token = localStorage.getItem('token');

  useEffect (() => {
    checkLoggin(token);
  },[]);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthen ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
