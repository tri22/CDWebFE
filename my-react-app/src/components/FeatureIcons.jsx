import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaShoppingCart, FaShippingFast, FaUndo, FaMoneyBillWave } from 'react-icons/fa';

const features = [
  { icon: <FaShoppingCart />, title: 'Shop online' },
  { icon: <FaShippingFast />, title: 'Free shipping' },
  { icon: <FaUndo />, title: 'Return policy' },
  { icon: <FaMoneyBillWave />, title: 'Payment' }
];

const FeatureIcons = () => (
  <Row className="text-center">
    {features.map((f, i) => (
      <Col md={3} sm={6} key={i}>
        <div className="feature-icon mb-2 fs-3 text-primary">{f.icon}</div>
        <h6 className="fw-bold">{f.title}</h6>
        <p className="text-muted small">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Col>
    ))}
  </Row>
);

export default FeatureIcons;
    