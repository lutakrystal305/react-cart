import React, {useEffect, useContext} from 'react';
import Divider from '../material-ui/Divider';
import Card from '../material-ui/Card';
import Modal from '../material-ui/Modal';
import Rating1 from '../material-ui/Rating1';
import { PurchaseContext } from '../context/Purchase.Context';
import { Container, Row, Col } from 'reactstrap';
import './Cart.css';
import './Button.css';
import './Button1.css';
import Comment from './Comment';

const cartItem = JSON.parse(sessionStorage.getItem('cartItem'));
const Index = () => {
    const { total, totalPrice, items } = useContext(PurchaseContext);
    useEffect(() => {
        totalPrice();
    },[items]);
    return(
        <div className="Item">
            <h3>Your Items</h3>
            <div className='Cartz'>
                <Divider />
                <div className="Itemz">
                    <Container className="cardS">
                        <Row>
                        {items.map( x => 
                            x.isChosen ?
                            (<Col sm='4'>
                                <Card product={x} className='Cardz' />
                            </Col>)
                            : ''
                        )}
                        </Row>
                    </Container>
                        <h5>Total price: {total} <span>({items.length} items)</span></h5>
                    <Modal /> 
                </div>
            </div>
            <div className='rating'>
                <Rating1 />
                <Comment />
            </div>
        </div>
    )
}
export default Index;