import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LocationPinIcon from '@mui/icons-material/LocationPin';
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
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
            {
                id: 'p2',
                name: 'Product B',
                price: 350000,
                quantity: 2,
                color: 'Blue',
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
        ],
    },
    {
        id: 2,
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
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
            {
                id: 'p2',
                name: 'Product B',
                price: 350000,
                quantity: 2,
                color: 'Blue',
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
        ],
    },
    {
        id: 3,
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
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
            {
                id: 'p4',
                name: 'Product D',
                price: 500000,
                quantity: 3,
                color: 'Black',
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
        ],
    },
    {
        id: 4,
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
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
            {
                id: 'p4',
                name: 'Product D',
                price: 500000,
                quantity: 3,
                color: 'Black',
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
        ],
    },
    {
        id: 5,
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
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
            {
                id: 'p4',
                name: 'Product D',
                price: 500000,
                quantity: 3,
                color: 'Black',
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
        ],
    },
];

export default function Order() {
    const [activeTab, setActiveTab] = useState('on-shipping');

    const filteredOrders = sampleOrders.filter((order) => order.status === activeTab);

    const orderCounts = {
        'no-paid': sampleOrders.filter(o => o.status === 'no-paid').length,
        'on-shipping': sampleOrders.filter(o => o.status === 'on-shipping').length,
        'arrived': sampleOrders.filter(o => o.status === 'arrived').length,
        'canceled': sampleOrders.filter(o => o.status === 'canceled').length,
    };

    return (
        <div>
            <Header />
            {/* <Header /> */}
            <Container className="my-4 orders-container">
                <h2 className="mb-3 fw-bold">My Orders</h2>

                {/* Navbar */}
                <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav.Item>
                        <Nav.Link eventKey="no-paid">
                            No paid <Badge>{orderCounts['no-paid']}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="on-shipping">
                            On Shipping <Badge>{orderCounts['on-shipping']}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="arrived">
                            Arrived <Badge>{orderCounts['arrived']}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="canceled">
                            Canceled <Badge>{orderCounts['canceled']}</Badge>
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
                                    <div className="mb-2 order-id">
                                        <strong>Order ID #{order.id}</strong>
                                        <span className="text-primary order-status">{order.status}</span>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="mb-2 order-address">
                                        <p >
                                            <LocationPinIcon />
                                            {order.shippingAddress}
                                        </p>
                                    </div>

                                    {/* Product Scroll */}
                                    <div className="mb-3 list-product" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                        <Row xs={1} md={2}>
                                            {order.products.map(product => (
                                                <Col key={product.id} className="mb-2 d-flex product-item">
                                                    <img className='product-img' src={product.image} alt={product.name} style={{ width: 80, height: 80, marginRight: 10 }} />
                                                    <div>
                                                        <div><strong>{product.name}</strong></div>
                                                        <div className='product-price'>Price: {product.price.toLocaleString()} VND</div>
                                                        <div>x{product.quantity}</div>
                                                        <div style={{ color: product.color }}>Color: {product.color}</div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>

                                    {/* Total + Actions */}

                                </Card.Body>
                                <div className="d-flex justify-content-between align-items-center order-total">
                                    <div className='d-flex text-center'>
                                        <strong>Total: ${order.totalPrice.toLocaleString()}</strong><br />
                                        <small>(Items: {order.totalQuantity})</small>
                                    </div>
                                    <Link to={`/order/${order.id}`}>
                                        <Button variant="info">Details</Button>
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}
