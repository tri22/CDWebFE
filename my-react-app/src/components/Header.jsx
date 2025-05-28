import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/Header.scss';
const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path;
    const handleCartClick = () => navigate('/cart');

    return (
        <div id='header'>
            <Navbar expand="lg" variant="light" className='fixed-top shadow-sm py-3'>
                <Container>
                    <Navbar.Brand as={Link} to="/pages" className="label me-5">Furnix</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='custom-toggle' />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className={`nav-item-custom ${isActive("/") ? "active" : ""}`}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/blog" className={`nav-item-custom ${isActive("/blog") ? "active" : ""}`}>Blog</Nav.Link>
                            <Nav.Link as={Link} to="/shop" className={`nav-item-custom ${isActive("/shop") ? "active" : ""}`}>Shop</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className={`nav-item-custom ${isActive("/contact") ? "active" : ""}`}>Contact</Nav.Link>
                            <Nav.Link as={Link} to="/About" className={`nav-item-custom ${isActive("/About") ? "active" : ""}`}>About Us</Nav.Link>
                        </Nav>
                        <div className="d-flex align-items-center gap-3">
                            <div className="search-box d-flex">
                                <Button variant="outline-light" onClick={() => setShowSearch(!showSearch)}><SearchIcon /></Button>
                                {showSearch && (
                                    <InputGroup className="mt-2 d-none d-lg-flex search-input-group">
                                        <Form.Control placeholder="Search..." />
                                    </InputGroup>
                                )}
                            </div>

                            <Button variant="outline-light" onClick={handleCartClick}>
                                <ShoppingCartIcon />
                            </Button>

                            <Dropdown>
                                <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className='btn-menu-dropdown d-flex align-items-center'>
                                    <AccountCircleIcon />
                                    <MenuIcon />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/login">
                                        <LoginIcon className="me-2" />
                                        Login
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
