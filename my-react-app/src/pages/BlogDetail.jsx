import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from '../components/BlogSideBar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PostMeta from '../components/PostMeta';

const BlogDetail = () => {
    const location = useLocation();
    const { blog } = location.state || {};
    if (!blog) return <p>Không tìm thấy bài viết.</p>;

    return (
        <Container className="pt-5" style={{ color: 'white' }}>
            {/* Breadcrumb */}
            <div className="text-muted mb-3">shopee / blog / {blog.title}</div>
            <Row>
                <Col md={8}>
                    <div className="mb-5" >
                        <img
                            src={blog.image}
                            className="w-full rounded"
                            style={{
                                width: "100%",
                                maxHeight: "400px",
                                objectFit: "contain", // 👈 chứa toàn bộ ảnh không bị cắt
                                borderRadius: "8px",
                                marginBottom: "20px",
                                backgroundColor: "#f8f9fa", // 👈 thêm nền sáng nếu ảnh không lấp đầy
                            }}
                        />
                        <PostMeta {...blog.meta} />
                        <p className="mb-3" style={styles.title}>{blog.title}</p>
                        <p style={styles.description}>{blog.description}</p>
                        <p style={styles.description}>{blog.content}</p>
                    </div>
                </Col>
                {/* Sidebar */}
                <Col md={4}>
                    <Sidebar
                        categories={categories}
                        recentPosts={blogs.slice(0, 3)}
                    />
                </Col>
            </Row>

            {/* Quote */}
            <blockquote className="fst-italic border-start border-4 ps-3 text-secondary my-4">
                {blog.content}
            </blockquote>

            {/* Prev / Next Navigation */}
            <Row className="border-top pt-4 align-items-center justify-content-between">
                <Col xs={6}>
                    <div className="d-flex align-items-center gap-2">
                        <Button variant="outline-light" size="sm">
                            <ArrowBackIosNewIcon fontSize="small" />
                        </Button>
                        <div>
                            <div className="fw-bold text-light">New wooden furniture</div>
                            <div className="text-muted small">Back</div>
                        </div>
                    </div>
                </Col>
                <Col xs={6} className="text-end">
                    <div className="d-flex justify-content-end align-items-center gap-2">
                        <div>
                            <div className="fw-bold text-light">your office should have only natural material</div>
                            <div className="text-muted small">Next</div>
                        </div>
                        <Button variant="outline-light" size="sm">
                            <ArrowForwardIosIcon fontSize="small" />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
const styles = {
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    description: {
        fontSize: "16px",
        color: "#555",
    },
};
export default BlogDetail;
