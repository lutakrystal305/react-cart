import React from 'react';
import Rating1 from '../material-ui/Rating1';
import { Link } from 'react-router-dom';
import nature from '../img/nature.jpg';
import './Home.css';


const Home = () => {
    return(
        <div className='Home'>
            <div className='bg-home'>
                <div className='bg-opacity'></div>
                <img src={nature} alt='bg' /> 
            </div>
            <div className='bg-content-home'>
                <h2>Sorry for the inconvenience!</h2>
                <Link to='/product?page=1' className='btn-store'>FuckUBitchZzzzz...</Link>
                <Rating1 />
            </div>
        </div>
    )
}
export default Home;