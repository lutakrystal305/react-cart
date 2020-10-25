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
    const [isLoading, setIsLoading] = useState(true);
    const [searchP, setSearchP] = useState([]);
    const [search, setSearch] = useState(false);

    const handleChangePage = (x) => {

        setChangePage('/products'+x);
    }
    const handleChangeClick = () => {
        setChangePage('/products?page=1')
    }
    let url
    if (changePage) {
        url = changePage;
    } else {
        url = '/products?page=1';
    }

    

    const getProduct = () => {
        axios
            .get("https://amber-api.herokuapp.com" + url)
            .then((res) => {

                setProducts(res.data.products);
                setCurrentPage(res.data.currentPage);
                setNextPage(res.data.nextPage);
                setNext2Page(res.data.next2Page);
                setPrePage(res.data.prePage);
                setPre2Page(res.data.pre2Page);
                setTopUrl(res.data.topUrl);
                setEndPage(res.data.endPage);
                if (products) {
                    setIsLoading(false);
                }
            })
    }
    let arr;
    const changeProduct = (value) => {
        if (value) {
            setSearch(true);
            value=value.toLowerCase();
            arr=products.filter((x) => {
                if (x.name.toLowerCase().indexOf(value) !== -1) {
                    return x;
                }
            })
            console.log(arr);   
            setSearchP(arr);
        } else {
            setSearch(false);
        }
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
                handleChangePage,
                handleChangeClick,
                isLoading,
                searchP,
                search,
                changeProduct
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}