import React from 'react';
import Rating1 from '../material-ui/Rating1';
import forest from '../img/forest.jpg';
import { Link } from 'react-router-dom';

const Logged = () => {
    return(
        <div className='Logged'>
            <h2>Welcome to Amber</h2>
            <Link to='/product?page=1' className='btn-store'>Store</Link>
            <Rating1 />

        </div>
    );
}
export default Logged;
