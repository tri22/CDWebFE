import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TimelineItem from '../components/TimelineItem';
import { FaTruck, FaUndoAlt, FaMedal, FaHeadset } from 'react-icons/fa';

const About = () => {
  const data = [
    {
      year: '1910',
      text: 'Starting as a humble woodworking studio, FURNIX crafted timeless furniture pieces rooted in tradition and artisan skill.',
      image: `/image/product/product6.png`,
      reverse: false,
    },
    {
      year: '1990',
      text: 'A new era began as FURNIX embraced innovation—blending modern production technology with classic craftsmanship for exceptional collections.',
      image: `/image/product/product9.png`,
      reverse: true,
    },
    {
      year: '2010',
      text: 'FURNIX expanded globally, bringing sustainable elegance and artistic living into modern homes around the world.',
      image: `/image/product/product1.png`,
      reverse: false,
    },
  ];

  const features = [
    {
      icon: <FaTruck size={40} color="#FF6B6B" />,
      title: 'Free Delivery',
      description: 'Enjoy fast and free shipping on all furniture orders—no minimum required.',
    },
    {
      icon: <FaUndoAlt size={40} color="#4dabf7" />,
      title: 'Money Back Guarantee',
      description: 'Not satisfied? We offer a full refund within 30 days—no questions asked.',
    },
    {
      icon: <FaMedal size={40} color="#f59f00" />,
      title: 'Quality Product',
      description: 'Crafted with precision, our furniture blends luxury with long-lasting durability.',
    },
    {
      icon: <FaHeadset size={40} color="#5c7cfa" />,
      title: '24/7 Support',
      description: 'Our customer care team is always here for you—anytime, anywhere.',
    },
  ];

  return (
    <div className="bg-light text-dark">
      <Header></Header>
      <Container className="py-5 mt-5">
        <h2 className="text-center fw-bold mb-3">ABOUT FURNIX</h2>
        <p className="text-center text-muted mb-5">
          Since 1650, FURNIX has crafted premium furniture that stands the test of time.. Let's explore our journey.
        </p>

        <div>
          {data.map((item, index) => (
            <TimelineItem key={index} {...item} />
          ))}
        </div>


        <div className='bg-light'>
          <Row className="text-center">
            {features.map((item, index) => (
              <Col key={index} md={3} sm={6} xs={12} className="mb-4">
                <Card className="border-0 py-4 px-2 h-100">
                  <Row className='d-flex align-items-center mb-2'>
                    <Col md={5}>
                      <div className="mb-3">{item.icon}</div>
                    </Col>
                    <Col md={6}>
                      <h5 className="fw-bold">{item.title}</h5>
                    </Col>
                    
                  </Row>
                  <p className="text-muted px-3">{item.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>


        {/* Newsletter Signup */}
        <div className="text-center py-5 bg-white shadow-sm">
          <h5 className="fw-bold">Sign up for emails</h5>
          <p className="text-muted">FOR NEWS, COLLECTIONS & MORE</p>
          <input
            type="email"
            className="form-control w-50 mx-auto mb-3"
            placeholder="Enter your email address"
          />
          <Button variant="dark">SIGN UP</Button>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default About;
