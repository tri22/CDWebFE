import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Pencil, Trash, Check } from 'react-bootstrap-icons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../assets/styles/OrderDetail.scss';

const sampleOrderDetail = {
    id: 1,
    status: 'no-paid',
    user: {
        fullName: 'Nguyen Van A',
        email: 'a@gmail.com',
        phone: '0901234567',
        birthday: '1995-06-15',
        address: '123 ABC Street',
    },
    totalPrice: 50,
    totalQuantity: 3,
    orderDate: '2024-05-10',
    shippingFee: 3,
    note: 'Deliver during working hours',
    paymentMethod: { name: 'Cash on Delivery' },
    details: [
        {
            id: 1,
            product: {
                name: 'Sofa Da Iris',
                price: 20,
                category: 'Sofa',
                color: 'Blue',
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
            quantity: 1,
        },
        {
            id: 2,
            product: {
                name: 'Sofa Da Iris',
                price: 15,
                category: 'Sofa',
                color: 'Black',
                image: 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg',
            },
            quantity: 2,
        },
    ],
};

export default function OrderDetail() {
    const [order, setOrder] = useState(sampleOrderDetail);
    const [editingNote, setEditingNote] = useState(false);
    const [editingUser, setEditingUser] = useState(false);
    const [note, setNote] = useState(order.note);
    const [user, setUser] = useState(order.user);

    const handleQuantityChange = (id, delta) => {
        const newDetails = order.details.map((item) => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });

        const totalQuantity = newDetails.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = newDetails.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

        setOrder({ ...order, details: newDetails, totalPrice, totalQuantity });
    };

    const handleDeleteItem = (id) => {
        const newDetails = order.details.filter(item => item.id !== id);
        const totalQuantity = newDetails.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = newDetails.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
        setOrder({ ...order, details: newDetails, totalPrice, totalQuantity });
    };

    const renderActionButtons = () => {
        if (order.status === 'no-paid') {
            return (
                <>
                    <Button variant="success" className="me-2">Checkout</Button>
                    <Button variant="danger">Cancel Order</Button>
                </>
            );
        }
        if (order.status === 'on-shipping') {
            return <Button variant="danger">Cancel Order</Button>;
        }
        return null;
    };

    return (
        <div>
            <Header />
            <Container className="py-4 order-detail-container">
                <Row>
                    {/* Left Side */}
                    <Col md={8}>
                        <h4 className='order-id'>Order ID: #{order.id}</h4>
                        <p>Order Date: {order.orderDate}</p>
                        <div className='order-items'>
                            <h5><strong>Order Items</strong></h5>
                            <p className='order-status'>{order.status}</p>
                            {order.details.map((item) => (
                                <Card key={item.id} className="mb-3">
                                    <Card.Body className="d-flex align-items-center justify-content-between">
                                        <div className='d-flex'>
                                            <img src={item.product.image} alt="product" width={100} />
                                            <div className='d-flex flex-column'>
                                                <p>{item.product.category}</p>
                                                <p><strong>{item.product.name}</strong></p>
                                                <p>Color: {item.product.color}</p>

                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <div className="ms-3 flex-grow-1 d-flex">
                                                <p className='mx-3 align-content-center'>${item.product.price}</p>
                                                <InputGroup className="" style={{ width: '120px', marginRight: "20px" }}>
                                                    <Button variant="" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                                                    <Form.Control readOnly className='text-center' value={item.quantity} />
                                                    <Button variant="" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                                                </InputGroup>
                                            </div>
                                            <Button variant="outline-danger" className='d-flex align-items-center' onClick={() => handleDeleteItem(item.id)}>
                                                <p><strong>${(item.product.price * item.quantity).toFixed(2)}</strong></p>
                                                <Trash />
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>

                        <div className='order-summary'>
                            <h5><strong>Order Summary</strong></h5>
                            <p><strong>Subtotal:</strong> ${(order.totalPrice - order.shippingFee + 1).toFixed(2)}</p>
                            <p><strong>Total Items:</strong> {order.totalQuantity}</p>
                            <p><strong>Order Total:</strong> ${(order.totalPrice).toFixed(2)}</p>
                            <p><strong>Discount:</strong> -$1.00</p>
                            <p><strong>New Customer:</strong> Yes</p>
                            <p><strong>Shipping Fee:</strong> ${order.shippingFee.toFixed(2)}</p>
                            <p><strong>Total:</strong> ${(order.totalPrice).toFixed(2)}</p>
                        </div>
                    </Col>

                    {/* Right Side */}
                    <Col md={4}>
                        {/* Notes */}
                        <Card className="mb-3">
                            <Card.Header>
                                Notes
                                <span className="float-end" onClick={() => setEditingNote(!editingNote)} style={{ cursor: 'pointer' }}>
                                    {editingNote ? <Check /> : <Pencil />}
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    disabled={!editingNote}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Card.Body>
                        </Card>

                        {/* Customer Info */}
                        <Card className="mb-3">
                            <Card.Header>
                                Customer
                                <span className="float-end" onClick={() => setEditingUser(!editingUser)} style={{ cursor: 'pointer' }}>
                                    {editingUser ? <Check /> : <Pencil />}
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-2">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        disabled={!editingUser}
                                        value={user.fullName}
                                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control
                                        type="date"
                                        disabled={!editingUser}
                                        value={user.birthday}
                                        onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        disabled={!editingUser}
                                        value={user.address}
                                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        disabled={!editingUser}
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        disabled={!editingUser}
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        {/* Actions */}
                        <div className="text-center">
                            {renderActionButtons()}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}
