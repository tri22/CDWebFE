import React from 'react';
import { Button, Col, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.scss';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path;

    return (
        <div id='header'>
            <Navbar expand="lg" bg="light" variant="light" sticky="top" className='shadow-sm py-3'>
                <Container>
                    <Navbar.Brand as={Link} to="/pages" className="label me-5">Hekto</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='custom-toggle' />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className={`nav-item-custom ${isActive("/") ? "active" : ""}`}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/pages" className={`nav-item-custom ${isActive("/pages") ? "active" : ""}`}>Pages</Nav.Link>
                            <Nav.Link as={Link} to="/products" className={`nav-item-custom ${isActive("/products") ? "active" : ""}`}>Products</Nav.Link>
                            <Nav.Link as={Link} to="/blog" className={`nav-item-custom ${isActive("/blog") ? "active" : ""}`}>Blog</Nav.Link>
                            <Nav.Link as={Link} to="/shop" className={`nav-item-custom ${isActive("/shop") ? "active" : ""}`}>Shop</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className={`nav-item-custom ${isActive("/contact") ? "active" : ""}`}>Contact</Nav.Link>
                        </Nav>
                        <div className="search-box d-none d-lg-block">
                            <InputGroup>
                                <Form.Control placeholder="Search" />
                                <Button variant="primary"><SearchIcon /></Button>
                            </InputGroup>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
