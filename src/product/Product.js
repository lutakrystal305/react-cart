import React, { useEffect, useContext } from 'react';
import Cart from '../components/bootstrap/Cart';
import Pagination from '../components/bootstrap/Pagination';
import './Product.css';

import { ProductContext } from '../components/context/Product.Context';

const Product = () => {
    const { getProduct,changePage, handleChangePage } = useContext(ProductContext);
    
    handleChangePage(window.location.search);
    console.log(`${window.location.search} loca`)
    useEffect(() => {
        getProduct();   
    },[changePage]);
    return(
            <div className='Product'>
                <h2> Products </h2>
                <Cart />
                <Pagination className="Paginationz"/> 
            </div>
    )
}

export default Product;