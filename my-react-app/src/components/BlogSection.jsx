import React from 'react';
import { Row, Col } from 'react-bootstrap';

const blogs = [
  { img: '/images/blog1.jpg', date: 'Sep 26, 2022', title: 'Paint your office in natural colors only' },
  { img: '/images/blog2.jpg', date: 'Sep 26, 2022', title: 'Paint your office in natural colors only' },
  { img: '/images/blog3.jpg', date: 'Sep 26, 2022', title: 'Paint your office in natural colors only' },
];

const BlogSection = () => (
  <Row>
    {blogs.map((blog, i) => (
      <Col md={4} sm={6} xs={12} key={i} className="mb-4 text-center">
        <img src={blog.img} alt="Blog" className="img-fluid mb-2" />
        <p className="text-muted small">{blog.date}</p>
        <p>{blog.title}</p>
        <a href="#" className="text-decoration-underline">Read more</a>
      </Col>
    ))}
  </Row>
);

export default BlogSection;
