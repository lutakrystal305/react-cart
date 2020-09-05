import React, { useState } from 'react';

export const CartContext = React.createContext();
export const CartProvider = (props) => {
    
    const [cartItem, setCartItem] = useState([]);
    const addToCart = (product) => {
        setCartItem(cartItem.concat(product));
        console.log(cartItem);
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
