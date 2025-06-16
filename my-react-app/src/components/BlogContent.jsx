import React from "react";
import { useNavigate } from "react-router-dom";
import PostMeta from "./PostMeta";
import { useTranslation } from "react-i18next";

const BlogContent = ({ blog, onClick }) => {
    const { t } = useTranslation(); // Khởi tạo hook
    return (
        <div className="mb-5" onClick={onClick}>
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
            <p className="mb-3" style={styles.title}>{t(blog.title)}</p> {/* Dịch title */}
            <p style={styles.description}>{t(blog.description)}</p> {/* Dịch description */}
        </div>
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
export default BlogContent;
