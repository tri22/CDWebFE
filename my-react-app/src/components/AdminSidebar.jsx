import React from 'react';
import { FiClock, FiGrid, FiHeart, FiGift , FiList, FiBox, FiSettings, FiPower,  FiUser } from 'react-icons/fi';
import { Nav, } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const menuItems = [
  { icon: <FiClock />, label: 'Dashboard', link: '/AdminHome' },
  { icon: <FiGrid />, label: 'Products', link: '/ProductManagement' },
  { icon: <FiUser />, label: 'Users', link: '/UserManagement' },
  { icon: <FiGift />, label: 'Vouchers', link: '/VoucherManagement' },
  { icon: <FiList />, label: 'Order Lists', link: '/OrderManagement' },
  { icon: <FiBox />, label: 'Product Stock', link: '/ProductStock' },
  { icon: <FiSettings />, label: 'Logs', link: '/' },
  { icon: <FiPower />, label: 'Logout', link: '/' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 h-100 bg-white border-r px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 pt-4">
        <span className="text-black">FURNIX</span>
      </h1>

      {menuItems.map((item, idx) => (
         <Nav.Link
          key={idx}
          as={Link}
          to={item.link}
          className={`nav-item-custom d-flex align-items-center gap-2 py-2 px-3 rounded ${currentPath === item.link ? 'bg-blue-100 text-blue-600 fw-bold' : 'text-dark'}`}
        >
          <span className="text-lg py-2">{item.icon}</span>
          <span>{item.label}</span>
        </Nav.Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
