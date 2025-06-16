// PostMeta.jsx
import { useTranslation } from "react-i18next";
import { FaHeart, FaComment } from "react-icons/fa";

const PostMeta = ({ date, categories, author, likes, comments }) => {
    const { t } = useTranslation(); // Khởi tạo hook
    return (
        <div style={styles.postMeta}>
            <span>{date}</span>
            <span style={styles.divider}>|</span>
            {categories.map((category, index) => (
                <span key={index}>{t(category)}</span> // Dịch category
            ))}
            <span style={styles.divider}>|</span>
            <span>{author}</span>
            <span style={styles.divider}>|</span>
            <span style={styles.iconText}>
                <FaHeart /> {likes}
            </span>
            <span style={styles.divider}>|</span>
            <span style={styles.iconText}>
                <FaComment /> {comments}
            </span>
        </div>
    );
};
const styles = {
    postMeta: {
        fontSize: "14px",
        color: "#999",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        margin: "16px 0px",
    },
    divider: {
        margin: "0 8px",
        color: "#ccc",
    },
    iconText: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
};

export default PostMeta;
