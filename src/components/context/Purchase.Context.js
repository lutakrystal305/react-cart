import React, { useState,useContext } from 'react';
import { CartContext } from './Cart.Context';

const data=sessionStorage.getItem('cartItem');
export const PurchaseContext = React.createContext();
export const PurchaseProvider = (props) => {
    const { cartItem } = useContext(CartContext);
    var cartItemS;
    if (cartItem) {
        cartItemS = cartItem;
    } else if (data) {
        cartItemS =JSON.parse(data);
    } else {
        cartItemS = [];
    }
    const [items, setItems] = useState(cartItemS);
   
    const handleChangePro = (product) => {
        const index = items.indexOf(product);
        cartItemS= [
            ...items.slice(0,index),
            {...product, isChosen: !product.isChosen},
            ...items.slice(index+1)
        ]   
        setItems(cartItemS);
        sessionStorage.setItem('cartItem', cartItemS);
    } 


    return(
        <PurchaseContext.Provider
            value={{
                items,
                handleChangePro
            }}
        >
            {props.children}
        </PurchaseContext.Provider>
    )
}