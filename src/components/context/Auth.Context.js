import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();
export const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({})

  const checkLoggin = (token) => {
    axios
      .post("http://localhost:8080/user/checkToken", { token })
      .then((res) => {
        if (res.data) {
          setIsAuth(true);
          localStorage.setItem("key", true);
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
        }
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        checkLoggin: checkLoggin,
        user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
