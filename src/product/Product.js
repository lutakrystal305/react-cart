import React, { useEffect, useContext } from 'react';
import Cart from '../components/bootstrap/Cart';
import Pagination from '../components/bootstrap/Pagination';
import './Product.css';
import Progress from '../components/material-ui/Progress';
import { ProductContext } from '../components/context/Product.Context';
import Search from './Search';
import Carousel from '../components/bootstrap/Carousel';

const Product = () => {
    const { getProduct,changePage, handleChangePage, isLoading } = useContext(ProductContext);
    
    handleChangePage(window.location.search);
    useEffect(() => {
        getProduct();   
    },[changePage]);
    return(
            <div className='Product'>
                <h2> Products </h2>
                <Carousel />
                <div className='search'>
                    <Search />
                </div>
                { isLoading ?
                    <Progress />
                   :(
                    <Cart /> 
                    )
                }
                <Pagination className="Paginationz"/> 
            </div>
    )
}

export default Product;