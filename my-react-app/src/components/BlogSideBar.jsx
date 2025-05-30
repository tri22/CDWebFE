import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Button, Form, InputGroup } from 'react-bootstrap';

const BlogSidebar = ({ bestBlog, categories, recentPosts }) => {
    return (
        <div className="px-5">
            {/* Search Box */}
            <div className="mb-4 pe-5">
                <InputGroup>
                    <Form.Control placeholder="Search" />
                    <Button variant="outline-dark" onClick={() => setShowSearch(!showSearch)}>
                        <SearchIcon />
                    </Button>
                </InputGroup>

            </div>

            {/* Featured Post */}
            <div className="mb-4">
                <img
                    src={bestBlog.image}
                    alt="sofa"
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "180px", objectFit: "cover" }}
                />
                <h5 className="fw-bold text-dark mb-2">{bestBlog.title}</h5>
                <p className="text-muted">{bestBlog.description}</p>
            </div>

            {/* Category */}
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-2">Category</h5>
                <ul className="list-unstyled text-muted">
                    {categories.map((cat, index) => (
                        <li className="my-2" key={index}>{cat.name} ({cat.count})</li>
                    ))}
                </ul>
            </div>

            {/* Recent Posts */}
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-2">Recent Posts</h5>
                <ul className="list-unstyled text-muted">
                    {recentPosts.map((post, index) => (
                        <li className="my-2" key={index}>{post.title}</li>
                    ))}
                </ul>
            </div>

            {/* Tags */}
            <div>
                <h5 className="fw-bold text-dark mb-2">Tags</h5>
                <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-secondary">sofa</span>
                    <span className="badge bg-secondary">clean</span>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
