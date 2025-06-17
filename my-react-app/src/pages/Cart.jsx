import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import cartApi from '../api/cartApi';
import { toast } from 'react-toastify';
import orderApi from "../api/orderApi";
import { formatPrice } from "../utils/Data";
import voucherApi from "../api/voucherApi";
import { useAuth } from '../api/AuthContext.jsx';
import { currentUser } from '../api/authApi';
const Cart = () => {
    const { t } = useTranslation(); // Khởi tạo hook useTranslation
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [user, setUser] = useState();
    const [shippingFee, setShippingFee] = useState(0);


    useEffect(() => {
        if (user?.address) {
            const fetchShippingFee = async () => {
                const fee = await shippingFeeCount();
                setShippingFee(fee);
            };
            fetchShippingFee();
        }
    }, [user]);



    // Lấy dữ liệu Cart từ BE
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const userData = await currentUser()
                const response = await cartApi.getCart();
                const data = response.data;
                const transformed = (data.items || []).map(item => ({
                    id: item.id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image,
                    productId: item.product.id
                }));
                setCart(transformed);
                console.log(userData.result)
                setUser(userData.result)
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
            }
        };
        fetchCart();
    }, []);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.warning(t('please_enter_coupon'));
            return;
        }

        try {
            const res = await voucherApi.getVoucher(couponCode);
            const discount = res.data.result.discount;
            console.log(discount)
            setDiscountAmount(discount);
            toast.success(t('coupon_applied_successfully'));
        } catch (err) {
            setDiscountAmount(0);
            toast.error(t('invalid_coupon'));
            console.error(err);
        }
    };


    // Thay đổi số lượng và update Cart
    const handleQuantityChange = async (id, delta) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return updatedCart;
        });

        const currentItem = cart.find(item => item.id === id);
        const updatedQuantity = Math.max(1, currentItem.quantity + delta);
        const itemData = { quantity: updatedQuantity, cartItemId: id };
        try {
            const response = await cartApi.updateItemQuantity(itemData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Cập nhật số lượng thất bại.");
            console.error(error);
        }
    };

    // Xoá Cart
    const handleRemove = async (id) => {
        const response = await cartApi.removeCartItem(id);
        toast.success(response.data.message);
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const handleOrder = async () => {
        const paymentMethodId = 1;
        const calculatedFee = await shippingFeeCount();
        setShippingFee(calculatedFee);
        const orderData = {
            note: "Giao hàng nhanh",
            paymentMethodId: paymentMethodId,
            shippingFee: calculatedFee,
            discount: discountAmount,
            voucherCode: couponCode
        };
        try {
            const response = await orderApi.createOrderFromCart(orderData);
            const createdOrder = response.data;
            console.log("Đã lưu đơn hàng:", createdOrder);
            await cartApi.clearCart();
            toast.success("Đặt hàng thành công!");
            navigate('/order');
        } catch (error) {
            toast.error("Đặt hàng thất bại!");
            console.error(error);
        }
    };

    const shippingFeeCount = async () => {
        const from = await getCoordinates("Thủ Đức, Hồ Chí Minh");
        const to = await getCoordinates(user.address); // hoặc địa chỉ người nhận

        if (!from || !to) return;

        const apiKey = "5b3ce3597851110001cf62486aa8d4d7999740e1b24be316d62d2f65";
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const distance = data.features[0].properties.segments[0].distance; // tính bằng mét
            console.log("Khoảng cách (m):", distance);


            const baseFee = 1000;
            const distanceInKm = distance / 1000; // convert m -> km
            const fee = Math.round(baseFee * distanceInKm);
            console.log("Phí vận chuyển (VND):", fee);

            return fee;
        } catch (error) {
            console.error("Lỗi khi gọi OpenRouteService:", error);
            return 10000; // fallback nếu lỗi
        }
    };


    async function getCoordinates(address) {
        const apiKey = "5b3ce3597851110001cf62486aa8d4d7999740e1b24be316d62d2f65";
        const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const coords = data.features[0].geometry.coordinates; // [lng, lat]
            return { lat: coords[1], lng: coords[0] };
        } catch (error) {
            console.error("Không thể lấy toạ độ:", error);
            return null;
        }
    }



    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartTotal = subtotal * (1 - discountAmount / 100);

    return (
        <div>
            <Header></Header>
            <Container className="mb-5" style={{ marginTop: '100px' }}>
                <h4>{t('cart_title', { count: cart.length })}</h4>
                <Table responsive bordered className="align-middle mt-4">
                    <thead className="table-dark">
                        <tr className="text-uppercase text-center">
                            <th></th>
                            <th>{t('photo')}</th>
                            <th>{t('product')}</th>
                            <th>{t('price')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('subtotal')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id} className="text-center">
                                <td>
                                    <Button variant="link" onClick={() => handleRemove(item.id)} className="text-danger"><DeleteIcon /></Button>
                                </td>
                                <td>
                                    <img src={item.image} alt={item.name} style={{ width: "80px" }} />
                                </td>
                                <td>{item.name}</td>
                                <td>{formatPrice(item.price)}</td>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                                        <span className="mx-2 px-2">{item.quantity}</span>
                                        <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                                    </div>
                                </td>
                                <td className="text-warning fw-bold">{formatPrice(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row className="mt-4">
                    <Col md={6} className="d-flex gap-2">
                        <Form.Control
                            placeholder={t('coupon_code')}
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button variant="dark" onClick={handleApplyCoupon}>{t('apply_coupon')}</Button>

                    </Col>
                    <Col md={6} className="text-end">
                        <Button variant="dark">{t('update_cart')}</Button>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={{ span: 4, offset: 8 }}>
                        <div className="p-4 bg-dark text-white rounded">
                            <h5>{t('cart_totals')}</h5>
                            <div className="d-flex justify-content-between mt-3">
                                <span>{t('shipping fee')}</span>
                                <span>{formatPrice(shippingFee)}</span>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <span>{t('subtotal')}</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>{t('discount')}</span>
                                <span>-{discountAmount}%</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>{t('cart_totals')}</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <Button className="w-100 mt-3" variant="outline-light" onClick={handleOrder}>{t('proceed_checkout')}</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Cart;