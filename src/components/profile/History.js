import React, { useEffect, useContext } from 'react';
import { CartContext } from '../context/Cart.Context';
import Footer from '../footer/'
import zx from '../img/zx.png';
import zxxx from '../img/zxxx.png';
import './History.css';

const History = () => {
    
    const { history, getHistory } = useContext(CartContext);
    useEffect(() => {
        document.title = " Your history"
        getHistory();
    }, [])
    return(
        <div className='History'>
            <h3>History purchase:</h3>
            <img src={zx} alt='left-scene' className='left-scene'/>
            <img src={zxxx} alt='right-scene' className='right-scene'/>
            <table>
                <tr>
                    <th>Id:</th>
                    <th>Items:</th>
                    <th>Price:</th>
                    <th>Since:</th>
                </tr>
                
                    {history.map(x => (
                        <tr>
                            <td >{history.indexOf(x)+1}</td>
                            <td className='name-product' >
                                {x.items.map(y => (
                                    <tr ><td>{y.name} : {y.count}</td></tr>
                                ))}
                            </td>
                            
                            
                            <td >{x.total}</td>
                            {x.date ?
                                (<td >{x.date}</td>)
                            : ''
                            }
                        </tr>
                    ))}
                </table>
                <Footer />
        </div>
    )
}
export default History;