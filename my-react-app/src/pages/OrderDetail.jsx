import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Pencil, Trash, Check } from 'react-bootstrap-icons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../assets/styles/OrderDetail.scss';
import orderApi from '../api/orderApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'; // thêm vào nếu chưa có
import { formatPrice } from '../utils/Data';

export default function OrderDetail() {
    const [order, setOrder] = useState(null);
    const [editingNote, setEditingNote] = useState(false);
    const [note, setNote] = useState('');
    const [editingUser, setEditingUser] = useState(false);
    const [user, setUser] = useState({
        username: '',
        fullName: '',
        birthday: '',
        address: '',
        email: '',
        phone: ''
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await orderApi.getOrderById(id);
                const result = response.data.result;

                setOrder(result);
                setNote(result.note || '');

                setUser({
                    username: result.userResponse.username || '',
                    fullName: result.userResponse.fullName || '',
                    birthday: result.userResponse.birthday || '',
                    address: result.userResponse.address || '',
                    email: result.userResponse.email || '',
                    phone: result.userResponse.phone || ''
                });
            } catch (error) {
                toast.error("Không thể tải thông tin đơn hàng");
            }
        };
        fetchOrder();
    }, [id]);

    const handleCheckout = async () => {
        try {
            const response = await orderApi.createVNPayPayment(id, order.totalPrice);
            if (response.data.code === 'ok') {
                window.location.href = response.data.paymentUrl; // Chuyển hướng đến URL thanh toán VNPay
            } else {
                toast.error("Không thể tạo URL thanh toán");
            }
        } catch (error) {
            toast.error("Lỗi khi thực hiện thanh toán");
        }
    };

    const renderActionButtons = () => {
        if (order.status === 'NO_PAID') {
            return (
                <>
                    <Button variant="success" className="me-2" onClick={handleCheckout}>
                        Checkout
                    </Button>
                    <Button variant="danger">Cancel Order</Button>
                </>
            );
        }
        if (order.status === 'ON_SHIPPING') {
            return <Button variant="danger">Cancel Order</Button>;
        }
        return null;
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                note: note,
                user: {
                    fullName: user.fullName,
                    birthday: user.birthday,
                    address: user.address,
                    email: user.email,
                    phone: user.phone,
                },
            };
            await orderApi.updateOrder(id, updatedData);
            toast.success("Cập nhật đơn hàng thành công");
            setEditingNote(false);
            setEditingUser(false);
        } catch (error) {
            toast.error("Cập nhật thất bại");
        }
    };

    if (!order) return <p>Đang tải đơn hàng...</p>;

    return (
        <div>
            <Header />
            <Container className="py-4 order-detail-container">
                <Row>
                    <Col md={8}>
                        <h4 className='order-id'>Order ID: #{order.id}</h4>
                        <p>Order Date: {order.orderDate}</p>
                        <p>Note: {order.note}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Shipping Fee: {formatPrice(order.shippingFee)}</p>
                        <div className='order-items'>
                            <h5><strong>Order Items</strong></h5>
                            <p className='order-status'>{order.status}</p>
                            {order.details.map((item) => (
                                <Card key={item.id} className="mb-3">
                                    <Card.Body className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                                        <div className='d-flex'>
                                            <img src={item.product.image} alt="product" width={100} />
                                            <div className='product-info d-flex flex-column ms-3'>
                                                <p>{item.product.category.name}</p>
                                                <p><strong>{item.product.name}</strong></p>
                                                <p>Color: {item.product.color}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="ms-3 flex-grow-1">
                                                <p className='mb-1'>Quantity: {item.quantity}</p>
                                                <p className='mb-0'><strong>Total: {formatPrice(item.product.price * item.quantity)}</strong></p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Col>

                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Header>
                                Notes
                                <span
                                    className="float-end"
                                    onClick={editingNote ? handleSave : () => setEditingNote(true)}
                                    style={{ cursor: 'pointer' }}>
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

                        <Card className="mb-3">
                            <Card.Header>
                                Customer Info
                                <span
                                    className="float-end"
                                    onClick={editingUser ? handleSave : () => setEditingUser(true)}
                                    style={{ cursor: 'pointer' }}>
                                    {editingUser ? <Check /> : <Pencil />}
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        disabled={true}
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    />
                                </Form.Group>
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
                                        type="email"
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

                        <div className="text-center">
                            {renderActionButtons()}
                        </div>

                        <div className='order-summary card mt-3 p-3'>
                            <h5><strong>Order Summary</strong></h5>
                            <p><strong>Subtotal:</strong> {formatPrice(order.totalPrice - order.shippingFee + 1)}</p>
                            <p><strong>Total Items:</strong> {order.totalQuantity}</p>
                            <p><strong>Order Total:</strong> {formatPrice(order.totalPrice)}</p>
                            <p><strong>Discount:</strong> -formatPrice(1.00)</p>
                            <p><strong>New Customer:</strong> Yes</p>
                            <p><strong>Shipping Fee:</strong> {formatPrice(order.shippingFee)}</p>
                            <p className="fw-bold fs-5"><strong>Total:</strong> {formatPrice(order.totalPrice)}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}