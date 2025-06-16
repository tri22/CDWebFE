import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState, useCallback } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
    // Lấy thông tin user từ localStorage
    const getUserFromStorage = () => {
        try {
            const userData = localStorage.getItem("user");
            if (userData) {
                const parsed = JSON.parse(userData);
                return parsed?.result || null;
            }
            return null;
        } catch (error) {
            console.error("Lỗi khi lấy user từ localStorage:", error);
            return null;
        }
    };

    const user = getUserFromStorage();

    // State để quản lý dữ liệu form
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        birthday: user?.birthday ? user.birthday.split("T")[0] : "",
        fullName: user?.fullName || "",
    });

    // State để quản lý trạng thái loading
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const updateData = {
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            birthday: formData.birthday ? new Date(formData.birthday).toISOString() : null,
            fullName: formData.fullName,
        };

        try {
            const response = await userApi.updateUser(user?.id, updateData);
            const updatedUser = response.data.result;
            localStorage.setItem("user", JSON.stringify({ result: updatedUser }));
            toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật user:", error);
            const errorMessage =
                error.response?.data?.message || "Đã có lỗi xảy ra khi cập nhật thông tin.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <ProfileForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Container>
            <Footer />
        </div>
    );
};

export default Profile;