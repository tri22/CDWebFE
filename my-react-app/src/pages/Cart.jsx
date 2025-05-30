import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import cartApi from '../api/cartApi';
import { toast } from 'react-toastify';
const initialCart = [
  {
    id: 1,
    name: "Porcelain Dinner Plate (27CM)",
    price: 59,
    quantity: 2,
    image: "/image/product/product2.png",
  },
  {
    id: 2,
    name: "Ophelia Matte Natural Vase",
    price: 168,
    quantity: 1,
    image: "/image/product/product2.png",
  },
  {
    id: 3,
    name: "Porcelain Dinner Plate",
    price: 70,
    quantity: 1,
    image: "/image/product/product2.png",
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.getCart();
        const data = response.data; // 👈 dữ liệu thật nằm ở đây
        const transformed = (data.items || []).map(item => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        }));
        setCart(transformed);

        console.log("Transformed cart:", transformed); // 👈 Xem dữ liệu sau khi map
        setCart(transformed);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    fetchCart();
  }, []);


  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = async (id) => {
    const response = await cartApi.removeCartItem(id);
    toast.success(response.data.message);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrder = () => {
      navigate('/order');
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = subtotal + 35; // giả định phí ship 35

  return (
    <div>
      <Header></Header>
      <Container className="mb-5" style={{ marginTop: '100px' }}>
        <h4>Cart ({cart.length} item)</h4>
        <Table responsive bordered className="align-middle mt-4">
          <thead className="table-dark">
            <tr className="text-uppercase text-center">
              <th></th>
              <th>Photo</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
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
                <td>${item.price}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                    <span className="mx-2 px-2">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                  </div>
                </td>
                <td className="text-warning fw-bold">${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Row className="mt-4">
          <Col md={6} className="d-flex gap-2">
            <Form.Control placeholder="Coupon code" />
            <Button variant="dark">Apply Coupon</Button>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="dark">Update Cart</Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={{ span: 4, offset: 8 }}>
            <div className="p-4 bg-dark text-white rounded">
              <h5>Cart totals</h5>
              <div className="d-flex justify-content-between mt-3">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Cart totals</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-100 mt-3" variant="outline-light" onClick={handleOrder}>Proceed to Checkout</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Cart;
