import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/Order.scss';
import orderApi from '../api/orderApi';
import { formatPrice } from '../utils/Data';
import { toast } from 'react-toastify';

// Hàm lấy userId từ localStorage
const getUserIdFromStorage = () => {
    try {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsed = JSON.parse(userData);
            return parsed?.result?.id || null;
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi lấy userId:", error);
        return null;
    }
};

const statusMap = {
    'no-paid': 'NO_PAID',
    'paid': 'PAID',
    'on-shipping': 'SHIPPING',
    'canceled': 'CANCELLED',
    'failed': 'FAILED',
};

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('no-paid');

    // Lấy dữ liệu đơn hàng từ server
    useEffect(() => {
        const fetchOrders = async () => {
            const userId = getUserIdFromStorage();
            if (!userId) {
                toast.error("Không tìm thấy thông tin người dùng!");
                return;
            }

            try {
                const response = await orderApi.getOrderByUserId(userId);
                const fetchedOrders = response.data?.result || [];
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
                toast.error("Không thể tải đơn hàng.");
            }
        };

        fetchOrders();
    }, []);

    // Lọc đơn hàng theo tab đang chọn
    const filteredOrders = orders.filter(order => order.status === statusMap[activeTab]);
    // Đếm số lượng đơn theo từng trạng thái
    const orderCounts = {
        'no-paid': orders.filter(o => o.status === 'NO_PAID').length,
        'on-shipping': orders.filter(o => o.status === 'SHIPPING').length,
        'paid': orders.filter(o => o.status === 'PAID').length,
        'canceled': orders.filter(o => o.status === 'CANCELLED').length,
        'failed': orders.filter(o => o.status === 'FAILED').length,
    };

    return (
        <div>
            <Header />
            <Container className="my-4 orders-container">
                <h2 className="mb-3 fw-bold">My Orders</h2>

                {/* Tabs theo trạng thái */}
                <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    {Object.keys(orderCounts).map(key => (
                        <Nav.Item key={key}>
                            <Nav.Link eventKey={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                                <Badge className="ms-1">{orderCounts[key]}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>

                {/* Danh sách đơn hàng */}
                <Row className="mt-4" xs={1} md={2}>
                    {filteredOrders.length === 0 ? (
                        <p className="mt-3">No Orders</p>
                    ) : (
                        filteredOrders.map(order => (
                            <Col key={order.id} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        {/* Thông tin đơn hàng */}
                                        <div className="mb-2 order-id">
                                            <strong>Order ID #{order.id}</strong>
                                            <span className="text-primary ms-3 order-status">{order.status}</span>
                                        </div>
                                        <div className="mb-2"><strong>Order Date:</strong> {order.orderDate}</div>
                                        <div className="mb-2"><strong>Payment method:</strong> {order.paymentMethod}</div>
                                        <div className="mb-2"><strong>Note:</strong> {order.note}</div>
                                        <div className="mb-2"><strong>Shipping Fee:</strong> {formatPrice(order.shippingFee)}</div>

                                        {/* Danh sách sản phẩm */}
                                        {order.details && order.details.length > 0 ? (
                                            <div className="mb-3 list-product" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                                <Row xs={1} md={2}>
                                                    {order.details.map(item => (
                                                        <Col key={item.id} className="mb-2 d-flex product-item">
                                                            <img
                                                                className="product-img"
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                style={{ width: 80, height: 80, marginRight: 10 }}
                                                            />
                                                            <div>
                                                                <div><strong>{item.product.name}</strong></div>
                                                                <div className="product-price">
                                                                    {formatPrice(item.product.price)}
                                                                </div>
                                                                <div>x{item.quantity}</div>
                                                                <div style={{ color: item.product.color }}>
                                                                    {item.product.color}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
                                        ) : (
                                            <div className="mb-3 text-muted">Don't have products in this orders</div>
                                        )}
                                    </Card.Body>

                                    {/* Tổng tiền */}
                                    <div className="d-flex justify-content-between align-items-center order-total p-3">
                                        <div>
                                            <strong>Total: {formatPrice(order.totalPrice)}</strong><br />
                                            <small>(Items: {order.totalQuantity})</small>
                                        </div>
                                        <Link to={`/order/${order.id}`}>
                                            <Button variant="info">Details</Button>
                                        </Link>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}
