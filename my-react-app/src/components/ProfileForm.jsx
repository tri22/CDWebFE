import { Container, Form, Row, Col, Button } from "react-bootstrap";

const ProfileForm = ({ formData, handleChange, handleSubmit, isLoading }) => {
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
                    <Form.Control
                        type="text"
                        placeholder="Fullname"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="px-3 py-2"
                    />
                </Col>
                <Col md={12} className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="px-3 py-2"
                    />
                </Col>
                <Col md={12} className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-3 py-2"
                    />
                </Col>
                <Col md={12} className="mb-3">
                    <Form.Control
                        type="tel"
                        placeholder="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="px-3 py-2"
                    />
                </Col>
                <Col md={12} className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="px-3 py-2"
                    />
                </Col>
                <Col md={12} className="mb-3">
                    <Form.Control
                        type="date"
                        placeholder="Birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="px-3 py-2"
                    />
                </Col>
                <Col md={12}>
                    <Button type="submit" className="w-100 send-btn" disabled={isLoading}>
                        {isLoading ? "ĐANG CẬP NHẬT..." : "SUBMIT CHANGE"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
export default ProfileForm;