import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../assets/styles/TopHeader.scss';

const TopHeader = () => {
    return (
        <div id="top-header">
            <Container fluid="lg">
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start align-items-center left mb-2 mb-md-0">
                        <div className="email d-flex align-items-center me-3">
                            <MailOutlineIcon />
                            <span className="ms-2">chuyendeweb@gmail.com</span>
                        </div>
                        <div className="phone d-flex align-items-center">
                            <PhoneInTalkIcon />
                            <span className="ms-2">(12345) 0089977</span>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end align-items-center right">
                        <div className="login d-flex align-items-center me-3">
                            <span>Login</span>
                            <PersonIcon className="ms-2" />
                        </div>
                        <div className="wishlist d-flex align-items-center me-3">
                            <span>Wishlist</span>
                            <FavoriteBorderIcon className="ms-2" />
                        </div>
                        <div className="cart d-flex align-items-center">
                            <AddShoppingCartIcon />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TopHeader;
