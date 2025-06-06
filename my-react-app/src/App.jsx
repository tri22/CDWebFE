import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// Thêm vào đầu file App.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx';
import { AuthProvider } from './api/AuthContext.jsx'
import Order from './pages/Order.jsx';
import OrderDetail from './pages/OrderDetail.jsx';
import Profile from './pages/Profile.jsx';
import AdminHome from './pages/AdminHome.jsx'
import OrderManagement from './pages/OrderManagement.jsx'
import UserManagement from './pages/UserManagement.jsx'
import ProductManagement from './pages/ProductManagement.jsx'
import ProductStock from './pages/ProductStock.jsx'
import VoucherManagement from './pages/VoucherManagement.jsx'

function App() {
    return (
        <Router>
            <AuthProvider>
                <>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Blog" element={<Blog />} />
                        <Route path="/blogDetail" element={<BlogDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/order/:id" element={<OrderDetail />} />
                        <Route path="/Profile" element={<Profile />} />

                        {/* Admin pages */}
                        <Route path="/AdminHome" element={<AdminHome />} />
                        <Route path="/OrderManagement" element={<OrderManagement />} />
                        <Route path="/UserManagement" element={<UserManagement />} />
                        <Route path="/ProductManagement" element={<ProductManagement />} />
                        <Route path="/ProductStock" element={<ProductStock />} />
                        <Route path="/VoucherManagement" element={<VoucherManagement />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <ToastContainer position="top-right" autoClose={3000} />
                </>
            </AuthProvider>
        </Router>
    );
}


export default App;
