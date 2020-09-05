import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from '../components/bootstrap/Cart';
import './Product.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [prePage, setPrePage] = useState(null);
    const [topUrl, setTopUrl] = useState('');
    const [endPage, setEndPage] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8080/products/")
            .then((res) => {
                console.log(res.data.products);
                setProducts(res.data.products);
                setCurrentPage(res.data.currentPage);
                setNextPage(res.data.nextPage);
                setPrePage(res.data.prePage);
                setTopUrl(res.data.topUrl);
                setEndPage(res.data.endPage);
            })
    }, [])
    return(
        <div className='Product'>
            <h2>Products</h2>
            <Cart products={products} />
        </div>
    )
}

export default Product;