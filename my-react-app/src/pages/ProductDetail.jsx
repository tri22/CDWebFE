import React ,{useState} from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { BsHeart, BsCart3 } from 'react-icons/bs';
import '../assets/styles/ProductDetail.scss';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
const ProductDetail = () => {
  const location = useLocation();
  const { img, name, price, rating } = location.state || {};

  const products = Array.from({ length: 4 }, (_, i) => ({
    img: `/image/product/product${i + 1}.png`,
    name: `Product ${i + 1}`,
    price: '$73.00',
    rating: 5
  }));
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="product-detail-page bg-white text-dark" style={{marginTop:'100px'}}>
      <Header></Header>
      <Container className='py-5'>
        <Row>
          {/* Thumbnail gallery */}
          <Col md={1} className="d-flex flex-column gap-3">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={img}
                alt="Thumbnail"
                className="img-fluid border rounded"
              />
            ))}
          </Col>

          {/* Main image */}
          <Col md={6}>
            <img
              src={img}
              alt="Main"
              className="img-fluid rounded"
            />
          </Col>

          {/* Product Info */}
          <Col md={5}>
            <h5 className="fw-bold">{name}</h5>
            <div className="mb-2">
              {'★'.repeat(5)} <span className="text-muted">(top)</span>
            </div>
            <p>
              <del className="text-muted me-2">{price}</del>
              <span className="text-danger fw-bold">{price}</span>
            </p>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>

            {/* Quantity + Add to Cart */}
            <div className="d-flex align-items-center my-3 ">
              <div className="d-flex align-items-center gap-3 border  border-2">
                <Button variant="white" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                <span className='px-2'>{quantity}</span>
                <Button variant="white" onClick={() => setQuantity(q => q + 1)}>+</Button>
              </div>
              <Button variant="dark" className="ms-3">
                <BsCart3 className="me-2" />
                Add to cart
              </Button>
            </div>

            <div className="mb-2">
              <Button variant="dark" className="px-4">
                Buy now
              </Button>
              <Button variant="white" className="ms-3">
                <BsHeart className="me-2" />
                <span className="text-muted">Add to wishlist</span>
              </Button>
            </div>

            <div className="text-muted small">
              <p>Sku: 02</p>
              <p>Category: sofa</p>
              <p>
                Tag: <span className="text-decoration-underline">sofa</span>, <span className="text-decoration-underline">clean</span>
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultActiveKey="description" className="mt-4">
              <Tab eventKey="description" title="Description">
                <p className="mt-3 text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
              </Tab>
              <Tab eventKey="additional" title="Additional information">
                <p className="mt-3 text-muted">Extra info...</p>
              </Tab>
              <Tab eventKey="preview" title="Preview">
                <p className="mt-3 text-muted">Preview content...</p>
              </Tab>
            </Tabs>
          </Col>
        </Row>

        {/* Related products */}
        <h5 className="mt-5 fw-bold">Related products</h5>
        <Row className="mt-3">
          {products.map((product, index) => (
            <Col md={3} sm={6} xs={12} className="mb-4" key={index}>
              <ProductCard
                img={product.img}
                name={product.name}
                price={product.price}
                rating={product.rating}
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
