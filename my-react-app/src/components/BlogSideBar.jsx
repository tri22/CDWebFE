import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const BlogSidebar = ({ bestBlog, categories, recentPosts }) => {
    const { t } = useTranslation(); // Khởi tạo hook

    return (
        <div className="px-5">
            {/* Search Box */}
            <div className="mb-4 pe-5">
                <InputGroup>
                    <Form.Control placeholder={t('search')} /> {/* Thay "Search" */}
                    <Button variant="outline-dark">
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
                <h5 className="fw-bold text-dark mb-2">{t(bestBlog.title)}</h5>
                <p className="text-muted">{t(bestBlog.description)}</p>
            </div>
            {/* Category */}
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-2">{t('category')}</h5> {/* Thay "Category" */}
                <ul className="list-unstyled text-muted">
                    {categories.map((cat, index) => (
                        <li className="my-2" key={index}>
                            {t(`category.${cat.name.toLowerCase()}`)} ({cat.count}) {/* Dịch tên danh mục */}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Recent Posts */}
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-2">{t('recent_posts')}</h5> {/* Thay "Recent Posts" */}
                <ul className="list-unstyled text-muted">
                    {recentPosts.map((post, index) => (
                        <li className="my-2" key={index}>{t(post.title)}</li>
                    ))}
                </ul>
            </div>
            {/* Tags */}
            <div>
                <h5 className="fw-bold text-dark mb-2">{t('tags')}</h5> {/* Thay "Tags" */}
                <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-secondary">{t('tag.sofa')}</span> {/* Dịch tag */}
                    <span className="badge bg-secondary">{t('tag.clean')}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
