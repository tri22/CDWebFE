import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../assets/styles/Contact.scss'; // import file CSS tùy chỉnh
import Slider from '../components/Slider';
export default function Contact() {


    const ContactInfo = () => (
        <div className="contact-info text-center bg-white py-5 px-4 mt-5">
            <h2 className="my-3">GET IN TOUCH WITH US</h2>
            <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipiscing elit...</p>
            <p><strong>Office Hours:</strong> Mon - Fri, 8am - 5pm</p>
            <p><strong>Email:</strong> contact@company.com</p>
            <p><strong>Phone:</strong> (414) 897 - 5892</p>
            <p><strong>Location:</strong> 50 Middle Point Rd, San Francisco, 80412</p>
        </div>
    );

    const ContactForm = () => (
        <Form className="contact-form bg-white p-5 mx-5 mb-5">
            <Row>
                <Col md={6} className="mb-3">
                    <Form.Control type="text" placeholder="Name" className="custom-input" />
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Control type="email" placeholder="Email" className="custom-input" />
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Control type="text" placeholder="Phone" className="custom-input" />
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Control type="text" placeholder="Subject" className="custom-input" />
                </Col>
                <Col md={12} className="mb-3">
                    <Form.Control as="textarea" rows={5} placeholder="Type your message here..." className="custom-input" />
                </Col>
                <Col md={12}>
                    <Button type="submit" className="w-100 send-btn">
                        SEND MESSAGE →
                    </Button>
                </Col>
            </Row>
        </Form>
    );

    return (
        <div className="">
            <Header />
            <Slider/>
            <div  className=" ">
                <ContactInfo />
                <div className="px-5 mx-5">
                    <ContactForm />
                </div>
            </div>
            <Footer />
        </div>
    );
}
