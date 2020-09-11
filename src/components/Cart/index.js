import React, {useEffect, useContext} from 'react';
import Divider from '../material-ui/Divider';
import Card from '../material-ui/Card';
import { PurchaseContext, PurchaseProvider } from '../context/Purchase.Context';
import { Container, Row, Col } from 'reactstrap';
import './Cart.css';
import './Button.css';
import './Button1.css';

const cartItem = JSON.parse(sessionStorage.getItem('cartItem'));
const Index = () => {
    const { items } = useContext(PurchaseContext);
    
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
                    <button className="btn btn-2 color-green btn-itemZ"><b>Pay =))</b></button> 
                </div>
            </div>
        </div>
    )
}
export default Index;