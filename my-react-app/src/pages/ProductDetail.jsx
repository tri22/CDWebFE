import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BsHeart, BsCart3 } from 'react-icons/bs';
import '../assets/styles/ProductDetail.scss';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { API_PRODUCTS } from '../utils/Config';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(() => {
        axios.get(`${API_PRODUCTS}/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error('Error fetching product:', err));

        axios.get(API_PRODUCTS)
            .then(res => setRelatedProducts(res.data.filter(p => p.pdId !== parseInt(id)).slice(0, 4)))
            .catch(err => console.error('Error fetching related products:', err));
    }, [id]);
    if (!product) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div>
            <Header></Header>
            <Container className='py-5 product-detail-page bg-white text-dark '>
                <Row>
                    {/* Thumbnail gallery */}
                    <Col md={1} className="d-flex flex-column gap-3">
                        {[...Array(4)].map((_, i) => (
                            <img
                                key={i}
                                src={product.pdImage}
                                alt={`Thumbnail ${i + 1}`}
                                className="img-fluid border rounded"
                            />
                        ))}
                    </Col>

                    {/* Main image */}
                    <Col md={6}>
                        <img
                            src={product.pdImage}
                            alt={product.pdName}
                            className="img-fluid rounded"
                        />
                    </Col>

                    {/* Product Info */}
                    <Col md={5}>
                        <h5 className="fw-bold">{product.pdName}</h5>
                        <div className="mb-2">
                            {'★'.repeat(product.pdRating)}{'☆'.repeat(5 - product.pdRating)}
                            <span className="text-muted ms-2">({product.pdRating} stars)</span>
                        </div>
                        <p>
                            <span className="text-danger fw-bold">${product.pdPrice.toFixed(2)}</span>
                        </p>
                        <p className="text-muted">{product.pdDescribe}</p>

                        <div className="d-flex align-items-center mb-3">
                            <Form.Control type="number" defaultValue={1} style={{ width: '80px' }} />
                            <Button variant="dark" className="ms-3">
                                <BsCart3 className="me-2" />
                                Add to cart
                            </Button>
                        </div>

                        <div className="mb-2">
                            <BsHeart className="me-2" />
                            <span className="text-muted">Add to wishlist</span>
                        </div>

                        <div className="text-muted small">
                            <p>Sku: {product.pdId.toString().padStart(2, '0')}</p>
                            <p>Category: {product.pdCategory}</p>
                            <p>Color: {product.pdColor}</p>
                        </div>

                        <Tabs defaultActiveKey="description" className="mt-4">
                            <Tab eventKey="description" title="Description">
                                <p className="mt-3 text-muted">{product.pdDescribe}</p>
                            </Tab>
                            <Tab eventKey="additional" title="Additional information">
                                <p className="mt-3 text-muted">Color: {product.pdColor}</p>
                            </Tab>
                            <Tab eventKey="preview" title="Preview">
                                <p className="mt-3 text-muted">Preview not available.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>

                {/* Related products */}
                <h5 className="mt-5 fw-bold">Related products</h5>
                <Row className="mt-3">
                    {relatedProducts.map((product, index) => (
                        <Col md={3} sm={6} xs={12} className="mb-4" key={product.pdId}>
                            <ProductCard
                                img={product.pdImage}
                                name={product.pdName}
                                price={`$${product.pdPrice}`}
                                rating={product.pdRating}
                                id={product.pdId}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default ProductDetail;
