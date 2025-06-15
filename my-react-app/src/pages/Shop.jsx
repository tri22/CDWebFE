import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../assets/styles/Shop.scss';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import productApi from '../api/productApi';
import { formatPrice } from '../utils/Data';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [priceLimits, setPriceLimits] = useState([0, 0]);

    const productsPerPage = 9;
    useEffect(() => {
        productApi.getAllProduct()
            .then(({ data }) => {
                setProducts(data);

                setFilteredProducts(data);

                if (data.length) {
                    const prices = data.map(p => p.price);
                    const min = Math.min(...prices), max = Math.max(...prices);
                    setPriceLimits([min, max]);
                    setPriceRange([min, max]);
                }
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    const paginate = () => {
        const start = (currentPage - 1) * productsPerPage;
        return filteredProducts.slice(start, start + productsPerPage);
    };

    const countBy = (key) =>
        products.reduce((acc, p) => {
            const k = key === 'category' ? p.category.name : p[key];
            acc[k] = (acc[k] || 0) + 1;
            return acc;
        }, {});

    const handlePriceChange = e =>
        setPriceRange([priceLimits[0], +e.target.value]);

    const handleFilter = () => {
        const filtered = products.filter(p => {
            const matchCategory = !selectedCategory || p.category.name === selectedCategory;
            const matchColor = !selectedColor || p.color === selectedColor;
            const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
            return matchCategory && matchColor && matchPrice;
        });
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const renderFilterList = (items, setter, selected) => (
        <ul className="list-unstyled">
            {Object.entries(items).map(([key, count], i) => (
                <li
                    key={i}
                    style={{ cursor: 'pointer', fontWeight: selected === key ? 'bold' : 'normal' }}
                    onClick={() => setter(key === selected ? null : key)}
                >
                    {key} ({count})
                </li>
            ))}
        </ul>
    );

    const currentProducts = paginate();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const [start] = [(currentPage - 1) * productsPerPage];

    return (
        <div className="shop-page">
            <Header />
            <Slider />
            <Container className="my-5">
                <Row className="align-items-center gy-2 mb-4">
                    <Col xs={12} md={6}>
                        <p className="mb-0 text-center text-md-start">
                            Showing {start + 1}–{Math.min(start + productsPerPage, filteredProducts.length)} of {filteredProducts.length} results
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="d-flex justify-content-center justify-content-md-end">
                            <Form.Select className="w-auto">
                                <option>Sort by popularity</option>
                                <option>Sort by price</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={4} lg={3} className="mb-4">
                        <h6 className="fw-bold mb-3">Category</h6>
                        {renderFilterList(countBy('category'), setSelectedCategory, selectedCategory)}

                        <h6 className="fw-bold mt-4 mb-3">Color</h6>
                        {renderFilterList(countBy('color'), setSelectedColor, selectedColor)}

                        <h6 className="fw-bold mt-4 mb-3">Price</h6>
                        <Form.Range
                            min={priceLimits[0]}
                            max={priceLimits[1]}
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                        />

                        <p>{formatPrice(priceLimits[0])} - {formatPrice(priceRange[1])}</p>

                        <Button variant="dark" size="sm" onClick={handleFilter}>Filter</Button>
                    </Col>

                    <Col md={9}>
                        <Row>
                            {currentProducts.map(({ id, image, name, price, rating }) => (
                                <Col md={4} sm={6} xs={12} className="mb-4" key={id}>
                                    <ProductCard
                                        id={id}
                                        img={image}
                                        name={name}
                                        price={`${formatPrice(price)}`}
                                        rating={rating}
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
