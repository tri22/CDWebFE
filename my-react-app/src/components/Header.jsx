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
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation(); // Hook để dịch và đổi ngôn ngữ
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const { role, isLoggedIn, resetAuth } = useAuth();

    const isActive = (path) => currentPath === path;

    const handleCartClick = () => {
        navigate('/cart');
    };

    const logout = () => {
        resetAuth();
        navigate('/login');
    };

    const goToProfile = () => {
        navigate('/Profile');
    };

    // Hàm đổi ngôn ngữ
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div id='header'>
            <Navbar expand="lg" variant="light" className='fixed-top shadow-sm py-3'>
                <Container>
                    <Navbar.Brand as={Link} to="/pages" className="label me-5">Furnix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='custom-toggle' />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className={`nav-item-custom ${isActive('/') ? 'active' : ''}`}>
                                {t('home')}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/blog" className={`nav-item-custom ${isActive('/blog') ? 'active' : ''}`}>
                                {t('blog')}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/shop" className={`nav-item-custom ${isActive('/shop') ? 'active' : ''}`}>
                                {t('shop')}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contact" className={`nav-item-custom ${isActive('/contact') ? 'active' : ''}`}>
                                {t('contact.header')}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/About" className={`nav-item-custom ${isActive('/About') ? 'active' : ''}`}>
                                {t('about')}
                            </Nav.Link>
                        </Nav>
                        <div className="d-flex align-items-center gap-3">
                            {/* Dropdown chọn ngôn ngữ */}
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-dark" id="dropdown-language">
                                    {i18n.language === 'en' ? 'English' : 'Tiếng Việt'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                                    <Dropdown.Item onClick={() => changeLanguage('vi')}>Tiếng Việt</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="search-box d-flex align-items-center gap-2">
                                <InputGroup className="d-none d-lg-flex search-input-group">
                                    <Form.Control className='text-dark' placeholder={t('search')} />
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
                                        <Dropdown.Item as={Link} to="/Profile">{t('profile')}</Dropdown.Item>
                                        {role === "ADMIN" ? (
                                            <Dropdown.Item as={Link} to="/AdminHome">
                                                {t('admin')}
                                            </Dropdown.Item>
                                        ) : null}
                                        <Dropdown.Item as={Link} to="/order">{t('order')}</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>{t('logout')}</Dropdown.Item>
                                    </Dropdown.Menu>
                                ) : (
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/login">
                                            <LoginIcon className="me-2" /> {t('login')}
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
