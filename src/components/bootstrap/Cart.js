import React, { useContext } from "react";
import { Container, Row, Col, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import { CartContext } from "../context/Cart.Context";
import { ProductContext } from "../context/Product.Context";

const Cart = () => {

    const { addToCart } = useContext(CartContext);
    const { products,searchP,search } = useContext(ProductContext);
    let items; 
    if (search) {
        items=searchP;
    } else {
        items=products;
    }
    return(
        <Container>
            <Row>
            {items.map(product => (
                <Col sm='4'>
                <Card>
                    <CardImg top width="100%" src={product.image} alt="Card image cap" />
                    <CardBody>
                    <CardTitle><b>{product.name}</b></CardTitle>
                    <CardText>{product.description}</CardText>
                    <CardText>
                        <small className="text-muted">Price: {product.price}</small>
                    </CardText>
                    <Button color="success" onClick={() => addToCart(product)}>
                        Add to Cart
                    </Button>
                    </CardBody>
                </Card>
                </Col>
                ))}
            </Row>
        </Container>
    )
}
export default Cart;