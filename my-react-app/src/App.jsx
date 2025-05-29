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
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx';
import {AuthProvider} from './api/AuthContext.jsx'
function App() {
    return (
        <Router>
            <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/About" element={<About />} />
                <Route path="/Blog" element={<Blog />} />
                <Route path="/blogDetail" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

                {/* <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} /> */}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
