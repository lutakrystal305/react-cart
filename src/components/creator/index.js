import React from 'react';
import xinh from '../img/xinh.jpg';
import hzz from '../img/hzz.png';
import './Creator.css';
import './Creator-MB.css';
import Infor from './in4';
import Footer from '../footer/';

const Creator = () => {
    return (
        <div className='Creator'>
            <div className='cover-creator'>
                <img src={xinh} alt='cover' />
            </div>
            <div className='background'>
                <img src={hzz} alt='background' />
            </div>
            <Infor />
            <Footer />
        </div>
    )
}
export default Creator;