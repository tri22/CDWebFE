
import React, { useState, useEffect } from "react";
import BlogContent from "../components/BlogContent";
import Sidebar from "../components/BlogSideBar.jsx";
import { Container, Row, Col, Pagination, Breadcrumb } from "react-bootstrap";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import PostMeta from "../components/PostMeta.jsx";
import { AiOutlineHome } from "react-icons/ai";
const Blog = () => {
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
            title: "New modern sofa is here",
            image: "/image/product/product1.png",
            description:
                "Donec vitae felis eget nunc aliquet lacinia. Vestibulum a est at dui luctus volutpat.",
            meta: {
                date: "Sep 26, 2022",
                categories: ["Newest", "sofa and chair", "wooden"],
                author: "soroush norozy",
                likes: 5,
                comments: 3,
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis, elit a aliquet cursus, nisi lacus dapibus urna, ut tincidunt nisl urna ut sapien. Curabitur quis semper nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer nec facilisis lacus. Sed hendrerit, mauris eget dignissim sodales, nunc est mattis justo, vel varius orci sem a nisi. Maecenas eu risus eu magna vehicula tincidunt."
        },
        {
            id: 2,
            title: "Bài viết thứ 2",
            image: "/image/product/product2.png",
            description: "Phần mô tả tiếp theo cho bài viết 2...",
            meta: {
                date: "May 15, 2025",
                categories: ["Design", "minimal", "interior"],
                author: "Nguyễn Văn A",
                likes: 10,
                comments: 2,
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis, elit a aliquet cursus, nisi lacus dapibus urna, ut tincidunt nisl urna ut sapien. Curabitur quis semper nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer nec facilisis lacus. Sed hendrerit, mauris eget dignissim sodales, nunc est mattis justo, vel varius orci sem a nisi. Maecenas eu risus eu magna vehicula tincidunt."

        },
        {
            id: 3,
            title: "Bài viết thứ 3",
            image: "/image/product/product2.png",
            description: "Mô tả bài viết thứ 3...",
            meta: {
                date: "May 16, 2025",
                categories: ["Modern", "interior"],
                author: "Trần Thị B",
                likes: 15,
                comments: 5,
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis, elit a aliquet cursus, nisi lacus dapibus urna, ut tincidunt nisl urna ut sapien. Curabitur quis semper nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer nec facilisis lacus. Sed hendrerit, mauris eget dignissim sodales, nunc est mattis justo, vel varius orci sem a nisi. Maecenas eu risus eu magna vehicula tincidunt."

        },
        {
            id: 4,
            title: "Bài viết thứ 4",
            image: "/image/product/product2.png",
            description: "Mô tả bài viết thứ 4...",
            meta: {
                date: "May 17, 2025",
                categories: ["Architecture", "wooden"],
                author: "Lê Văn C",
                likes: 20,
                comments: 7,
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis, elit a aliquet cursus, nisi lacus dapibus urna, ut tincidunt nisl urna ut sapien. Curabitur quis semper nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer nec facilisis lacus. Sed hendrerit, mauris eget dignissim sodales, nunc est mattis justo, vel varius orci sem a nisi. Maecenas eu risus eu magna vehicula tincidunt."

        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                    {/* Nội dung chính bên trái */}
                    <Col md={8}>

                        {(() => {
                            if (selectedBlog) {
                                return (
                                    <div>
                                        <Breadcrumb className="mb-4 ">
                                            <Breadcrumb.Item
                                                onClick={() => navigate('/')}
                                                linkAs="span"
                                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                            >
                                                <AiOutlineHome className="me-1 mb-1" /> Trang chủ
                                            </Breadcrumb.Item>

                                            <Breadcrumb.Item
                                                onClick={() => setSelectedBlog(null)}
                                                linkAs="span"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Blog
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
                                                        placeholder="Tiêu đề"
                                                        className="form-control"
                                                        value={newPost.title}
                                                        onChange={(e) =>
                                                            setNewPost({ ...newPost, title: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Link ảnh"
                                                        className="form-control"
                                                        value={newPost.image}
                                                        onChange={(e) =>
                                                            setNewPost({ ...newPost, image: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <textarea
                                                        placeholder="Mô tả"
                                                        className="form-control"
                                                        value={newPost.description}
                                                        onChange={(e) =>
                                                            setNewPost({ ...newPost, description: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <textarea
                                                        rows={20}
                                                        placeholder="Nội dung"
                                                        className="form-control"
                                                        value={newPost.content}
                                                        onChange={(e) =>
                                                            setNewPost({ ...newPost, content: e.target.value })
                                                        }
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
                                                            setSelectedBlog(newBlog); // Mở luôn bài vừa đăng
                                                            blogs.unshift(newBlog); // Cập nhật danh sách bài
                                                            setShowCreateForm(false);
                                                            setNewPost({
                                                                title: "",
                                                                image: "",
                                                                description: "",
                                                                content: "",
                                                                meta: {
                                                                    date: "",
                                                                    categories: [],
                                                                    author: "Người đăng",
                                                                    likes: 0,
                                                                    comments: 0,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        Đăng bài
                                                    </button>

                                                    <button
                                                        className="btn btn-primary px-4"
                                                        onClick={() => setShowCreateForm(!showCreateForm)}
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                )
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

                                    <div className="d-flex justify-content-end mt-4">
                                        <Pagination>
                                            <Pagination.Prev
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                            />
                                            {[...Array(totalPages)].map((_, i) => (
                                                <Pagination.Item
                                                    key={i + 1}
                                                    active={i + 1 === currentPage}
                                                    onClick={() => handlePageChange(i + 1)}
                                                >
                                                    {i + 1}
                                                </Pagination.Item>
                                            ))}
                                            <Pagination.Next
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                            />
                                        </Pagination>
                                    </div>
                                </>
                            );
                        })()}

                    </Col>

                    {/* Sidebar */}
                    <Col md={4} className="mt-1">
                        <Sidebar
                            bestBlog={blogs[1]}
                            categories={categories}
                            recentPosts={blogs.slice(0, 3)}
                        />
                        <div className="px-5">
                            <button
                                className="btn btn-primary mt-3 "
                                onClick={() => setShowCreateForm(!showCreateForm)}
                                style={{ alignSelf: 'center' }}
                            >
                                Đăng bài viết
                            </button>
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
};
export default Blog;
