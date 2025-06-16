
import React, { useState, useEffect } from "react";
import BlogContent from "../components/BlogContent";
import Sidebar from "../components/BlogSideBar.jsx";
import { Container, Row, Col, Pagination, Breadcrumb, Button } from "react-bootstrap";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import PaginationCom from "../components/PaginationCom.jsx";
import PostMeta from "../components/PostMeta.jsx";
import { AiOutlineHome } from "react-icons/ai";
import '../assets/styles/Blog.scss'
import { useTranslation } from "react-i18next";

const Blog = () => {
    const { t } = useTranslation();
    const categories = [
        { name: "Ceiling", count: 25 },
        { name: "Floor", count: 25 },
        { name: "Led", count: 25 },
        { name: "Modern", count: 25 },
        { name: "Retro", count: 25 },
        { name: "Wood", count: 25 },
    ];

    const blogs = [
        {
            id: 1,
            title: "blog.title_1", // Thay bằng khóa
            image: "/image/product/product1.png",
            description: "blog.description_1", // Thay bằng khóa
            meta: {
                date: "Sep 26, 2022",
                categories: ["category.newest", "category.sofa_and_chair", "category.wooden"], // Thay bằng khóa
                author: "soroush norozy",
                likes: 5,
                comments: 3,
            },
            content: "blog.content_1", // Thay bằng khóa
        },
        {
            id: 2,
            title: "blog.title_2",
            image: "/image/product/product2.png",
            description: "blog.description_2",
            meta: {
                date: "May 15, 2025",
                categories: ["category.design", "category.minimal", "category.interior"],
                author: "Nguyễn Văn A",
                likes: 10,
                comments: 2,
            },
            content: "blog.content_2",
        },
        {
            id: 3,
            title: "blog.title_3",
            image: "/image/product/product2.png",
            description: "blog.description_3",
            meta: {
                date: "May 16, 2025",
                categories: ["category.modern", "category.interior"],
                author: "Trần Thị B",
                likes: 15,
                comments: 5,
            },
            content: "blog.content_3",
        },
        {
            id: 4,
            title: "blog.title_4",
            image: "/image/product/product2.png",
            description: "blog.description_4",
            meta: {
                date: "May 17, 2025",
                categories: ["category.architecture", "category.wooden"],
                author: "Lê Văn C",
                likes: 20,
                comments: 7,
            },
            content: "blog.content_4",
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPost, setNewPost] = useState({
        title: "",
        image: "",
        description: "",
        content: "",
        meta: {
            date: new Date().toISOString().split("T")[0],
            categories: [],
            author: "Người đăng",
            likes: 0,
            comments: 0,
        }
    });

    useEffect(() => {
        if (showCreateForm) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [showCreateForm]);

    useEffect(() => {
        if (selectedBlog) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [selectedBlog]);

    return (
        <>
            <Header />
            <Container className="pt-5 mb-5" style={{ marginTop: "100px" }}>
                <Row>
                    <Col md={8}>
                        {(() => {
                            if (selectedBlog) {
                                return (
                                    <div>
                                        <Breadcrumb className="mb-4">
                                            <Breadcrumb.Item
                                                onClick={() => navigate('/')}
                                                linkAs="span"
                                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                            >
                                                <AiOutlineHome className="me-1 mb-1" />
                                                {t('home')} {/* Thay "Trang chủ" bằng khóa */}
                                            </Breadcrumb.Item>
                                            17:24
                                            <Breadcrumb.Item
                                                onClick={() => setSelectedBlog(null)}
                                                linkAs="span"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {t('blog')} {/* Thay "Blog" bằng khóa */}
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item active className="text-capitalize">
                                                {selectedBlog.title}
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                        <div className="my-5">
                                            <img
                                                src={selectedBlog.image}
                                                className="w-full rounded"
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "400px",
                                                    objectFit: "contain",
                                                    borderRadius: "8px",
                                                    marginBottom: "20px",
                                                    backgroundColor: "#f8f9fa",
                                                }}
                                            />
                                            <PostMeta {...selectedBlog.meta} />
                                            <p className="mb-3" style={styles.title}>{selectedBlog.title}</p>
                                            <p style={styles.description}>{selectedBlog.description}</p>
                                            <p style={styles.description}>{selectedBlog.content}</p>
                                        </div>
                                    </div>
                                );
                            }
                            if (showCreateForm) {
                                return (
                                    <div className="mb-4">
                                        {showCreateForm && (
                                            <div className="mt-4 p-3 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        placeholder={t('title')} // Thay "Tiêu đề"
                                                        className="form-control"
                                                        value={newPost.title}
                                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        placeholder={t('image_link')} // Thay "Link ảnh"
                                                        className="form-control"
                                                        value={newPost.image}
                                                        onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <textarea
                                                        placeholder={t('description')} // Thay "Mô tả"
                                                        className="form-control"
                                                        value={newPost.description}
                                                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <textarea
                                                        rows={20}
                                                        placeholder={t('content')} // Thay "Nội dung"
                                                        className="form-control"
                                                        value={newPost.content}
                                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-between mt-3">
                                                    <button
                                                        className="btn btn-success px-3"
                                                        onClick={() => {
                                                            const newBlog = {
                                                                ...newPost,
                                                                id: blogs.length + 1,
                                                                meta: {
                                                                    ...newPost.meta,
                                                                    date: new Date().toLocaleDateString("vi-VN"),
                                                                },
                                                            };
                                                            setSelectedBlog(newBlog);
                                                            blogs.unshift(newBlog);
                                                            setShowCreateForm(false);
                                                            setNewPost({
                                                                title: "",
                                                                image: "",
                                                                description: "",
                                                                content: "",
                                                                meta: {
                                                                    date: "",
                                                                    categories: [],
                                                                    author: t('default_author'), // Thay "Người đăng"
                                                                    likes: 0,
                                                                    comments: 0,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        {t('post_article')} {/* Thay "Đăng bài" */}
                                                    </button>
                                                    <button
                                                        className="btn btn-primary px-4"
                                                        onClick={() => setShowCreateForm(!showCreateForm)}
                                                    >
                                                        {t('cancel')} {/* Thay "Hủy" */}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return (
                                <>
                                    {currentBlogs.map((blog, index) => (
                                        <BlogContent
                                            key={index}
                                            blog={{ ...blog, id: index + 1 }}
                                            onClick={() => setSelectedBlog(blog)}
                                        />
                                    ))}
                                    <PaginationCom
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </>
                            );
                        })()}
                    </Col>
                    <Col md={4} className="mt-1">
                        <Sidebar
                            bestBlog={blogs[1]}
                            categories={categories}
                            recentPosts={blogs.slice(0, 3)}
                        />
                        <div className="px-5">
                            <Button
                                className="mt-3"
                                onClick={() => setShowCreateForm(!showCreateForm)}
                                style={{ alignSelf: 'center' }}
                                variant="outline-dark"
                            >
                                {t('post_article')} {/* Thay "Đăng bài viết" */}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
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
    paginationItem: {
        color: "#000",
        border: "1px solid #000",
        backgroundColor: "#fff",
        transition: "all 0.2s ease-in-out",
    },
    paginationItemHover: {
        backgroundColor: "#000",
        color: "#fff",
    },
    paginationItemActive: {
        backgroundColor: "#000",
        borderColor: "#000",
        color: "#fff",
    },
    paginationItemDisabled: {
        color: "#ccc",
        borderColor: "#ccc",
        backgroundColor: "#f8f9fa",
    },
};

export default Blog;
