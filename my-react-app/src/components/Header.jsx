import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/Header.scss';
import { BsHandbag } from "react-icons/bs";
import { FaUserPen } from "react-icons/fa6";
const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const [showSearch, setShowSearch] = useState(false);
    const isActive = (path) => currentPath === path;

    const handleCartClick = () => navigate('/cart');

    return (
        <div id='header'>
            <Navbar expand="lg" bg="light" variant="light" className='fixed-top shadow-sm py-3'>
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
                                    <InputGroup  className="d-none d-lg-flex search-input-group">
                                        <Form.Control className='text-dark' placeholder="Search..." />
                                    </InputGroup>
                                <Button variant="outline-dark" onClick={() => setShowSearch(!showSearch)}>
                                    <SearchIcon />
                                </Button>
                            </div>

                            <Button variant="outline-dark" onClick={handleCartClick}>
                                <ShoppingCartIcon />
                            </Button>

                            <Dropdown >
                                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" >
                                    <MenuIcon />
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{top:'50px',left:'-35px'}}>
                                    <Dropdown.Item as={Link} to="/login" className='ps-4 d-flex align-items-center justify-content-around '>
                                        Login   
                                        <LoginIcon className="mx-2 text-dark" />
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="" className='ps-4 d-flex align-items-center justify-content-around '>
                                        Profile   
                                        <PersonOutlineIcon className="mx-2 text-dark mb-2" />
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
