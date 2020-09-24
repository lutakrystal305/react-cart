import React, { useState,useContext } from 'react';
import { CartContext } from './Cart.Context';

const data=sessionStorage.getItem('cartItem');
export const PurchaseContext = React.createContext();
export const PurchaseProvider = (props) => {
    const { cartItem, convertCart } = useContext(CartContext);
    var cartItemS;
    if (cartItem) {
        cartItemS = cartItem;
    } else if (data) {
        cartItemS =JSON.parse(data);
    } else {
        cartItemS = [];
    }
    const [items, setItems] = useState(cartItemS);
    const [total, setTotal] = useState('');
    let same = false;
   
    const handleChangePro = (product) => {
        if (!same) {
            const index = items.indexOf(product);
            cartItemS= [
                ...items.slice(0,index),
                {...product, isChosen: !product.isChosen},
                ...items.slice(index+1)
            ]   
            setItems(cartItemS);
            sessionStorage.setItem('cartItem', JSON.stringify(cartItemS));
            console.log('z1');
        } else {
            same = true;
        }
    } 
    const handleDelItem = (product) => {
        same=true;
        const index = items.indexOf(product);
        cartItemS= [
            ...items.slice(0,index),
            ...items.slice(index+1)
        ];
        console.log(cartItemS);
        setItems(cartItemS);
        sessionStorage.setItem('cartItem', JSON.stringify(cartItemS));
        console.log('z2');
        convertCart(cartItemS);
    }
    console.log(items);
    const totalPrice = () => {
        let s;
        if (items.length !== 0) {
            items.reduce((a,b) => {
                s=(a +parseFloat(b.price.split('').slice(1).join('')));
                return s;
            },0);
            console.log(s)
            if (s !== 0 ) {
                s = '£' + s.toFixed(2);
            }
            setTotal(s);
        } else setTotal('£.0');
    }
    const dellItem = () => {
        setItems([]);
    }
    console.log(total)
    return(
        <PurchaseContext.Provider
            value={{
                total,
                totalPrice,
                items,
                handleChangePro,
                handleDelItem,
                dellItem
            }}
        >
            {props.children}
        </PurchaseContext.Provider>
    )
}