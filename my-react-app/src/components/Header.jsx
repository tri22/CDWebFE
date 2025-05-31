import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/Header.scss';
import { useAuth } from '../api/AuthContext';

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const { user, isLoggedIn, resetAuth } = useAuth();

    const isActive = (path) => currentPath === path;
    const handleCartClick = async () => {
        navigate('/cart');
    };

    const logout = () => {
        resetAuth(); // Gọi đúng hàm resetAuth
        navigate("/login"); // Optional: chuyển hướng sau khi logout
    };

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
                            <div className="search-box d-flex align-items-center gap-2">
                                <InputGroup className="d-none d-lg-flex search-input-group">
                                    <Form.Control className='text-dark' placeholder="Search..." />
                                </InputGroup>
                                <Button variant="outline-dark" onClick={() => setShowSearch(!showSearch)}>
                                    <SearchIcon />
                                </Button>
                            </div>

                            <Button variant="outline-dark" onClick={handleCartClick}>
                                <ShoppingCartIcon />
                            </Button>

                            <Dropdown>
                                <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className='btn-menu-dropdown d-flex align-items-center'>
                                    <AccountCircleIcon />
                                    <MenuIcon />
                                </Dropdown.Toggle>
                                {isLoggedIn ? (
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/profile">
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/order">
                                            Order
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                ) : (
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/login">
                                            <LoginIcon className="me-2" />
                                            Login
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                )}

                            </Dropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
