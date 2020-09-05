import React, { useContext } from "react";
import { Container, Row, Col, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import { CartContext } from "../context/Cart.Context";

const Cart = (props) => {
    const { products } = props;

    const { addToCart } = useContext(CartContext);

    return(
        <Container>
            <Row>
            {products.map(product => (
                <Col sm='4'>
                <Card>
                    <CardImg top width="100%" src={product.image} alt="Card image cap" />
                    <CardBody>
                    <CardTitle><b>{product.name}</b></CardTitle>
                    <CardText>{product.description}</CardText>
                    <CardText>
                        <small className="text-muted">Price: {product.price}</small>
                    </CardText>
                    <Button color="success" onClick={addToCart}>
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