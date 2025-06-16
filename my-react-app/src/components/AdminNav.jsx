import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FiMenu, FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import { FaFlagUsa } from 'react-icons/fa';
import { Col, Row, Card, Form, Container, Button, Dropdown, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';
const TopNavbar = ({ title }) => {
  const { user, isLoggedIn, resetAuth } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    resetAuth(); // Gọi đúng hàm resetAuth
    navigate("/login"); // Optional: chuyển hướng sau khi logout
  };

  function SelectLanguage () {
  return (
    <Form.Select aria-label="Default select example">
      <option defaultValue={1} value="1">English</option>
      <option value="2">Tiếng việt</option>
    </Form.Select>
  );
  }

  return (
    <Row className="flex items-center justify-between px-4 py-2 bg-white shadow-sm pt-4">
      {/* Left: Menu + Search */}
      <Col md={4}>
        <h2 >{title}</h2>
      </Col>
      <Col md={5}></Col>
      {/* Right: Notification, Language, User */}
      <Col md={3}>
        <Row className="justify-between">
          {/* Language Selector */}
          <Col className="d-flex align-items-center">
            <SelectLanguage></SelectLanguage>
          </Col>



          {/* User Info */}
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className='btn-menu-dropdown d-flex align-items-center'>
                <AccountCircleIcon />
                <MenuIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/Profile">
                  {/* Hiển thị thông tin người dùng */}
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/AdminHome">
                  {/* Hiển thị thông tin người dùng */}
                  Admin
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

        </Row>
      </Col>
    </Row>
  );
};

export default TopNavbar;
