import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';


const CompanyIntro = () => {
  return (
    <Container className="my-5 px-3">
      <Row className="align-items-center">
        {/* Hình ảnh bên trái */}
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src={`public/image/Slider/Slider1.jpg`}
            alt="About Soudernity"
            fluid
            rounded
            className="shadow-sm"
          />
        </Col>

        {/* Nội dung giới thiệu bên phải */}
        <Col md={12}>
          <h3 className="fw-bold mb-3">About Soudernity</h3>
          <p>
            <strong>Soudernity</strong> is a modern interior design brand that blends functionality, elegance, and sustainability. 
            Our goal is to bring calm, clarity, and creativity into every home.
          </p>

          <h5 className="fw-bold mt-4 mb-2">🌟 Vision</h5>
          <p>
            To inspire a lifestyle of harmony through smart, sustainable, and beautiful furniture.
          </p>

          <h5 className="fw-bold mt-3 mb-2">🎯 Mission</h5>
          <p>
            We design furniture with purpose and integrity — combining aesthetics, comfort, and eco-responsibility 
            in every product we offer.
          </p>

          <h5 className="fw-bold mt-3 mb-2">💡 Core Values</h5>
          <ul className="mb-0">
            <li><strong>Design-first:</strong> Everything begins with thoughtful, human-centered design.</li>
            <li><strong>Eco-focus:</strong> We choose sustainable materials and reduce waste.</li>
            <li><strong>Customer care:</strong> Your satisfaction drives our innovation.</li>
            <li><strong>Craftsmanship:</strong> Every piece is built to last and inspire.</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyIntro;
