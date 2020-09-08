import React, { useState } from 'react';
import axios from 'axios';

export const ProductContext = React.createContext();
export const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [nextPage, setNextPage] = useState({});
    const [next2Page, setNext2Page] = useState({});
    const [prePage, setPrePage] = useState({});
    const [pre2Page, setPre2Page] = useState({});
    const [topUrl, setTopUrl] = useState('');
    const [endPage, setEndPage] = useState({});
    const [changePage, setChangePage] = useState('');

    const handleChangePage = (x) => {
        console.log(`${x} ab`)
        setChangePage('/products'+x);
    }
    const url = changePage || '/products?page=1';
    console.log(`${url} zs1`);
    

    const getProduct = () => {
        axios
            .get("http://localhost:8080" + url)
            .then((res) => {
                console.log(res.data.products);
                setProducts(res.data.products);
                setCurrentPage(res.data.currentPage);
                setNextPage(res.data.nextPage);
                setNext2Page(res.data.next2Page);
                setPrePage(res.data.prePage);
                setPre2Page(res.data.pre2Page);
                setTopUrl(res.data.topUrl);
                setEndPage(res.data.endPage);
            })
    }
    return(
        <ProductContext.Provider
            value={{
                products,
                currentPage,
                nextPage,
                next2Page,
                prePage,
                pre2Page,
                topUrl,
                endPage,
                getProduct,
                changePage,
                handleChangePage
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}