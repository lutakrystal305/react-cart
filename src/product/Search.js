import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { ProductContext } from '../components/context/Product.Context';
import './Search.css';

const Search = () => {
    const { changeProduct } = useContext(ProductContext);
    const [value, setValue] = useState('');
    const handleChange= (event) => {
        let x = event.target.value;
        setValue(x);
        changeProduct(x);
        console.log(x);
    }
    return(
        <div className='Search'>
            <input type='text' placeholder='Search items' value={value} className='input-search'
            onChange={handleChange}
            />
            <FontAwesomeIcon icon={faSearch} className='icon-search'/>
        </div>
    )
}
export default Search;
