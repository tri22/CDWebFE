// PostMeta.jsx
import { FaHeart, FaComment } from "react-icons/fa";

const PostMeta = ({ date, categories, author, likes, comments }) => {
    return (
        <div style={styles.postMeta}>
            <span>{date}</span>
            <span style={styles.divider}>|</span>
            {categories.map((category, index) => (
            <span>{category}</span>
            ))}
            <span style={styles.divider}>|</span>
            <span>{author}</span>
            <span style={styles.divider}>|</span>
            <span style={styles.iconText}>
                <FaHeart></FaHeart> {likes}
            </span>
            <span style={styles.divider}>|</span>
            <span style={styles.iconText}>
                <FaComment></FaComment>{comments}
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
