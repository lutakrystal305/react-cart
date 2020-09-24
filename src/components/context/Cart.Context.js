import React, { useState } from 'react';
import axios from 'axios';

const data = sessionStorage.getItem('cartItem');
export const CartContext = React.createContext();
export const CartProvider = (props) => {
    let dataS = JSON.parse(data) || []
    const [cartItem, setCartItem] = useState(dataS);
    const [users, setUsers] = useState([]);
   
    const addToCart = (product) => {
        dataS = [{...product, isChosen: false}, ...cartItem];
        setCartItem(dataS);
        sessionStorage.setItem('cartItem', JSON.stringify(dataS));

    }
    const getUsers = () => {
        axios
            .get("http://localhost:8080/user/getUsers")
            .then((res) => {
                const a=res.data;
                let b=a.filter((x) => {
                    return x.rate;
                });
                setUsers(b);
            })        
    }
    const convertCart = (x) => {
        setCartItem(x);
    }
    const dellCart = () => {
        setCartItem([]);
        sessionStorage.removeItem('cartItem');
    }
    return(
        <CartContext.Provider
            value={{
                cartItem,
                addToCart,
                convertCart,
                dellCart,
                users,
                getUsers
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
} 
