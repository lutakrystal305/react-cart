import React, { useState } from 'react';

const data = sessionStorage.getItem('cartItem');
export const CartContext = React.createContext();
export const CartProvider = (props) => {
    let dataS = JSON.parse(data) || []
    const [cartItem, setCartItem] = useState(dataS);
   
    const addToCart = (product) => {
        dataS = [{...product, isChosen: false}, ...cartItem];
        setCartItem(dataS);
        sessionStorage.setItem('cartItem', JSON.stringify(dataS));

    }
    return(
        <CartContext.Provider
            value={{
                cartItem,
                addToCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
} 
