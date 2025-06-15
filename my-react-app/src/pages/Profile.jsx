import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import { useState } from "react"
import Footer from "../components/Footer";
import Header from "../components/Header";


const Profile = () => {
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
    const [cart, setCart] = useState(initialCart);
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Xử lý dữ liệu form
        alert("Form submitted!");
    };

    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, delta) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };


    const ProfileForm = () => {
        return (
            <Form className="contact-form bg-white p-5 m-5" onSubmit={handleSubmit}>
                <Row>
                    <Col md={12} className="text-center mb-4">
                        <img
                            src="https://i.pinimg.com/280x280_RS/cb/b7/29/cbb72981359fdc89fabd26fd1997ed56.jpg"
                            alt="Avatar"
                            className="img-fluid rounded-circle w-25 p-3"
                        />

                    </Col>
                    <Col md={12} className="mb-3">
                        <Form.Control type="text" placeholder="Fullname" className="custom-input" />
                    </Col>
                    <Col md={12} className="mb-3">
                        <Form.Control type="email" placeholder="Email" className="custom-input" />
                    </Col>
                    <Col md={12} className="mb-3">
                        <Form.Control type="tel" placeholder="Phone" className="custom-input" />
                    </Col>
                    <Col md={12} className="mb-3">
                        <Form.Control type="text" placeholder="Address" className="custom-input" />
                    </Col>
                    <Col md={12} className="mb-3">
                        <Form.Control type="date" placeholder="Birthday" className="custom-input" />
                    </Col>
                    <Col md={12} className="mb-3">
                        <Form.Control type="text" placeholder="Avatar URL" className="custom-input" />
                    </Col>
                    <Col md={12}>
                        <Button type="submit" className="w-100 send-btn">
                            SUBMIT CHANGE
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }

    const OrderList = () => {
        return (

            <Table responsive bordered className="align-middle my-5">
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
                            <td>
                                <Button variant="link" onClick={() => handleRemove(item.id)} className="text-danger"></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            <Header />
            <Container>
                <ProfileForm></ProfileForm>
                <h4>Cart ({cart.length} item)</h4>
                <OrderList />
            </Container>
            <Footer />
        </div>
    );
};

export default Profile;
