import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BsHeart, BsCart3 } from 'react-icons/bs';
import '../assets/styles/ProductDetail.scss';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import productApi from '../api/productApi';
import cartApi from '../api/cartApi';
import { toast } from 'react-toastify';
import { formatPrice } from '../utils/Data';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        // Lấy chi tiết sản phẩm theo ID
        productApi.getProduct(id)
            .then(res => setProduct(res.data))
            .catch(err => console.error('Error fetching product:', err));

            console.log(id)
            console.log(product)

        // Lấy danh sách sản phẩm liên quan
        productApi.getAllProduct()
            .then(res => {
                const filtered = res.data.filter(p => p.id !== parseInt(id)).slice(0, 4);
                setRelatedProducts(filtered);
            })
            .catch(err => console.error('Error fetching related products:', err));
    }, [id]);

    if (!product) return <p className="text-center mt-5">Loading...</p>;

    const addToCartHandler = async () => {
        console.log("cliked");
        const productData = {
            productId: id,
            quantity: 1,
        }
        try {
            const response = await cartApi.addToCart(productData)
            const message = response.data.message;
            toast.success(message); // hiển thị thông báo từ backend
        }
        catch {
            alert("Error while adding this product!");
        }
    };
    return (
        <div>
            <Header></Header>
            <Container className='py-5 product-detail-page bg-white text-dark '>
                <Row>
                    {/* Main image */}
                    <Col md={7}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded"
                        />
                    </Col>

                    {/* Product Info */}
                    <Col md={5}>
                        <h5 className="fw-bold">{product.name}</h5>
                        <div className="mb-2">
                            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                            <span className="text-muted ms-2">({product.rating} stars)</span>
                        </div>
                        <p>
                            <span className="text-danger fw-bold">{formatPrice(product.price)}</span>
                        </p>
                        <p className="text-muted">{product.description}</p>

                        <div className="d-flex align-items-center mb-3">
                            <Form.Control type="number" defaultValue={1} style={{ width: '80px' }} />
                            <Button variant="dark" className="ms-3" onClick={addToCartHandler} >
                                <BsCart3 className="me-2" />
                                Add to cart
                            </Button>
                        </div>

                        <div className="mb-2">PropTypes.node
                            <BsHeart className="me-2" />
                            <span className="text-muted">Add to wishlist</span>
                        </div>

                        <div className="text-muted small">
                            
                        </div>

                        <Tabs defaultActiveKey="description" className="mt-4">
                            <Tab eventKey="description" title="Description">
                                <p className="mt-3 text-muted">{product.description}</p>
                            </Tab>
                            <Tab eventKey="additional" title="Additional information">
                                <p className="mt-3 text-muted">Color: {product.color}</p>
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
                        <Col md={3} sm={6} xs={12} className="mb-4" key={product.id}>
                            <ProductCard
                                img={product.image}
                                name={product.name}
                                price={`${formatPrice(product.price)}`}
                                rating={product.rating}
                                id={product.id}
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
