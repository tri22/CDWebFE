import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

import '../assets/styles/Shop.scss'; // bạn tạo riêng nếu có style riêng
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const products = Array.from({ length: 9 }, (_, i) => ({
  img: `/image/product/product${i + 1}.png`, 
  name: `Product ${i + 1}`,
  price: '$73.00',
  rating: 5
}));

const Shop = () => {
  
  
  return (
    <div className="shop-page ">
      <Header></Header>
      <Container className='mt-5'>
        <Row className="m-4 ">
          <Col md={6}>
            <p>Showing 1–9 of 57 results</p>
          </Col>
          <Col md={6} className="text-end d-flex justify-content-end align-items-center gap-3 ">
            <Form.Select className="w-auto">
              <option>Sort by popularity</option>
              <option>Sort by price</option>
            </Form.Select>              
          </Col>
        </Row>
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <h6 className="fw-bold mb-3">Category</h6>
            <ul className="list-unstyled">
              {['Ceiling', 'Floor', 'Led', 'Modern', 'Retro', 'Wood'].map((cat, i) => (
                <li key={i}>{cat} (25)</li>
              ))}
            </ul>

            <h6 className="fw-bold mt-4 mb-3">Color</h6>
            <ul className="list-unstyled">
              {['Black', 'Blue', 'Red', 'Green', 'Yellow', 'Grey'].map((color, i) => (
                <li key={i}>{color} (25)</li>
              ))}
            </ul>

            <h6 className="fw-bold mt-4 mb-3">Price</h6>
            <Form.Range min={4} max={800} />
            <p>Price $4 - $800</p>
            <Button variant="dark" size="sm">Filter</Button>
          </Col>

          {/* Products */}
          <Col md={9}>
            <Row>
              {products.map((product, index) => (
                <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
                  <ProductCard
                    img={product.img}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                  />
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="link">View all &gt;</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Shop;
