import React from 'react';
import { Container, Row, Col, InputGroup, Button, Form } from 'react-bootstrap';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import '../assets/styles/Footer.scss'
const Footer = () => {
    return (
        <div id="footer">
            <Container>
                <h3 className='footer-title'>Soudemy</h3>
                <Row className="gy-4">
                    <Col xs={12} md={6} lg={3} className='first'>
                        <h3 className="footer-title">About Us</h3>

                        <p className="footer-contact">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, vero! Animi pariatur iure quo mollitia fugiat odit, doloremque quae cupiditate maxime distinctio. Repellat, tempore? Illum debitis rem voluptatum quasi quisquam!</p>
                    </Col>
                    <Col xs={6} md={6} lg={3}>
                        <h3 className="footer-title">Categories</h3>
                        <ul className="footer-list">
                            <li>Category 1</li>
                            <li>Category 2</li>
                            <li>Category 3</li>
                            <li>Category 4</li>
                            <li>Category 5</li>
                        </ul>
                    </Col>
                    <Col xs={6} md={6} lg={3}>
                        <h3 className="footer-title">Customer Care</h3>
                        <ul className="footer-list">
                            <li>My Account</li>
                            <li>Discount</li>
                            <li>Returns</li>
                            <li>Orders History</li>
                            <li>Orders Tracking</li>
                        </ul>
                    </Col>
                    <Col xs={12} md={6} lg={2}>
                        <h3 className="footer-title">Pages</h3>
                        <div className="footer-socials">
                            <FacebookIcon />
                            <InstagramIcon />
                            <TwitterIcon />
                            <PinterestIcon />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;