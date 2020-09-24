import React, { useContext } from 'react';
import { CartContext } from '../context/Cart.Context';
import avt from '../img/avt.png';
import './Comment.css';
import Rating1 from '../material-ui/Rating1'

const Comment = () => {
    const { users } = useContext(CartContext);
    return(
        <div className='Cart-comment'>
            {users.map(x => (
                <div className='viewer'>
                    <div className='author'>
                        <img src={avt} alt='avt' className='avt' width={50}/>
                    </div>
                    <div className='body-comment'>
                        <h6>{x.name}</h6>
                        <p>{x.rate.comment}</p>
                    </div>
                    <Rating1 user={x} />
                </div>
            ))}
        </div>
    )
}
export default Comment