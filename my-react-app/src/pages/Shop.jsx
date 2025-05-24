import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import '../assets/styles/Shop.scss';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import { API_PRODUCTS } from '../utils/Config';

const CATEGORIES = ['Ceiling', 'Floor', 'Led', 'Modern', 'Retro', 'Wood'];
const COLORS = ['Black', 'Blue', 'Red', 'Green', 'Yellow', 'Grey'];

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Mảng sản phẩm lọc
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Các filter state
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 0]); // min max price selected
    const [priceLimits, setPriceLimits] = useState([0, 0]); // min max price có trong data

    useEffect(() => {
        axios.get(API_PRODUCTS)
            .then(res => {
                setProducts(res.data);
                setFilteredProducts(res.data);

                // Tính min và max price từ data
                if (res.data.length > 0) {
                    const prices = res.data.map(p => p.pdPrice);
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    setPriceLimits([minPrice, maxPrice]);
                    setPriceRange([minPrice, maxPrice]);
                }
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    // Tính phân trang trên filteredProducts
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const start = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(start, start + productsPerPage);

    // Tính count category, color dựa trên filteredProducts hoặc products?
    // Nếu muốn count dựa trên toàn bộ products thì giữ nguyên như cũ
    const categoryCounts = {};
    const colorCounts = {};
    products.forEach(p => {
        categoryCounts[p.pdCategory] = (categoryCounts[p.pdCategory] || 0) + 1;
        colorCounts[p.pdColor] = (colorCounts[p.pdColor] || 0) + 1;
    });

    // const handlePriceChange = (values) => {
    //     setPriceRange(values);
    // };
    // Hàm xử lý khi thay đổi thanh price range slider
    const handlePriceChange = (e) => {
        // Nếu là range 2 đầu thì bạn cần slider custom, còn đây bạn đang dùng Form.Range là 1 đầu, 
        // mình sẽ giả sử chỉ có 1 slider max price, min giá tự min có trong data.
        const maxSelected = Number(e.target.value);
        setPriceRange([priceLimits[0], maxSelected]);
    };

    // Hàm filter khi nhấn nút filter
    const handleFilter = () => {
        const filtered = products.filter(p => {
            const matchCategory = selectedCategory ? p.pdCategory === selectedCategory : true;
            const matchColor = selectedColor ? p.pdColor === selectedColor : true;
            const matchPrice = p.pdPrice >= priceRange[0] && p.pdPrice <= priceRange[1];
            return matchCategory && matchColor && matchPrice;
        });
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const renderFilterList = (items, onClickFilter, selected) => (
        <ul className="list-unstyled">
            {Object.entries(items).map(([key, count], i) => (
                <li
                    key={i}
                    style={{ cursor: 'pointer', fontWeight: selected === key ? 'bold' : 'normal' }}
                    onClick={() => onClickFilter(key === selected ? null : key)} // toggle
                >
                    {key} ({count})
                </li>
            ))}
        </ul>
    );

    return (
        <div className="shop-page">
            <Header />
            <Slider />
            <Container className="my-5">
                <Row className="m-4">
                    <Col md={6}>
                        <p>Showing {start + 1}–{Math.min(start + productsPerPage, filteredProducts.length)} of {filteredProducts.length} results</p>
                    </Col>
                    <Col md={6} className="text-end d-flex justify-content-end align-items-center gap-3">
                        <Form.Select className="w-auto">
                            <option>Sort by popularity</option>
                            <option>Sort by price</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <h6 className="fw-bold mb-3">Category</h6>
                        {renderFilterList(categoryCounts, setSelectedCategory, selectedCategory)}

                        <h6 className="fw-bold mt-4 mb-3">Color</h6>
                        {renderFilterList(colorCounts, setSelectedColor, selectedColor)}

                        <h6 className="fw-bold mt-4 mb-3">Price</h6>
                        <Form.Range
                            min={priceLimits[0]}
                            max={priceLimits[1]}
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                        />
                        <p>Price ${priceLimits[0]} - ${priceRange[1]}</p>

                        <Button variant="dark" size="sm" onClick={handleFilter}>Filter</Button>
                    </Col>

                    <Col md={9}>
                        <Row>
                            {currentProducts.map(product => (
                                <Col md={4} sm={6} xs={12} className="mb-4" key={product.pdId}>
                                    <ProductCard
                                        id={product.pdId}
                                        img={product.pdImage}
                                        name={product.pdName}
                                        price={`$${product.pdPrice}`}
                                        rating={product.pdRating}
                                    />
                                </Col>
                            ))}
                        </Row>

                        <div className="d-flex justify-content-center mt-4">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? 'dark' : 'outline-dark'}
                                    className="mx-1"
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Shop;
