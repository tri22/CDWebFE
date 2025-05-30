import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/Order.scss';
// Sample order data
const sampleOrders = [
    {
        id: 1,
        status: 'on-shipping',
        user: { fullName: 'John Doe', email: 'john@example.com' },
        note: 'Deliver during working hours',
        shippingAddress: '123 Street, City',
        paymentMethod: { name: 'Cash on Delivery' },
        totalPrice: 500000,
        totalQuantity: 3,
        orderDate: '2024-05-10',
        shippingFee: 30000,
        products: [
            {
                id: 'p1',
                name: 'Product A',
                price: 150000,
                quantity: 1,
                color: 'Red',
                image: 'https://via.placeholder.com/80',
            },
            {
                id: 'p2',
                name: 'Product B',
                price: 350000,
                quantity: 2,
                color: 'Blue',
                image: 'https://via.placeholder.com/80',
            },
        ],
    },
    {
        id: 2,
        status: 'arrived',
        user: { fullName: 'Jane Smith', email: 'jane@example.com' },
        note: 'Leave at the door',
        shippingAddress: '456 Avenue, City',
        paymentMethod: { name: 'Bank Transfer' },
        totalPrice: 750000,
        totalQuantity: 5,
        orderDate: '2024-05-11',
        shippingFee: 40000,
        products: [
            {
                id: 'p3',
                name: 'Product C',
                price: 250000,
                quantity: 2,
                color: 'Green',
                image: 'https://via.placeholder.com/80',
            },
            {
                id: 'p4',
                name: 'Product D',
                price: 500000,
                quantity: 3,
                color: 'Black',
                image: 'https://via.placeholder.com/80',
            },
        ],
    },
];

export default function Order() {
    const [activeTab, setActiveTab] = useState('on-shipping');

    const filteredOrders = sampleOrders.filter((order) => order.status === activeTab);

    const orderCounts = {
        'on-shipping': sampleOrders.filter(o => o.status === 'on-shipping').length,
        'arrived': sampleOrders.filter(o => o.status === 'arrived').length,
        'canceled': sampleOrders.filter(o => o.status === 'canceled').length,
    };

    return (
        <div>
            {/* <Header /> */}
            <Container className="my-4">
                <h2 className="mb-3">My Orders</h2>

                {/* Navbar */}
                <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav.Item>
                        <Nav.Link eventKey="on-shipping">
                            On Shipping <Badge bg="secondary">{orderCounts['on-shipping']}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="arrived">
                            Arrived <Badge bg="secondary">{orderCounts['arrived']}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="canceled">
                            Canceled <Badge bg="secondary">{orderCounts['canceled']}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Order List */}
                <Row className="mt-4" xs={1} md={2}>
                    {filteredOrders.map(order => (
                        <Col key={order.id} className="mb-4">
                            <Card>
                                <Card.Body>

                                    {/* Order ID + Status */}
                                    <div className="mb-2">
                                        <strong>Order #{order.id}</strong> - <span className="text-primary text-uppercase">{order.status.replace('-', ' ')}</span>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="mb-2">
                                        <strong>Shipping Address:</strong> {order.shippingAddress}
                                    </div>

                                    {/* Product Scroll */}
                                    <div className="mb-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                        <Row xs={1} md={2}>
                                            {order.products.map(product => (
                                                <Col key={product.id} className="mb-2 d-flex">
                                                    <img src={product.image} alt={product.name} style={{ width: 80, height: 80, marginRight: 10 }} />
                                                    <div>
                                                        <div><strong>{product.name}</strong></div>
                                                        <div>Price: {product.price.toLocaleString()} VND</div>
                                                        <div>Qty: {product.quantity}</div>
                                                        <div>Color: {product.color}</div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>

                                    {/* Total + Actions */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Total:</strong> {order.totalPrice.toLocaleString()} VND<br />
                                            <small>Items: {order.totalQuantity}</small>
                                        </div>
                                        <Link to={`/order/${order.id}`}>
                                            <Button variant="info">Details</Button>
                                        </Link>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}
