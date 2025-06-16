import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import orderApi from '../api/orderApi';

export default function PaymentResult() {
    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const verifyPayment = async () => {
    //         const query = new URLSearchParams(location.search);
    //         const params = {
    //             orderId: query.get('vnp_TxnRef'),
    //             responseCode: query.get('vnp_ResponseCode'),
    //             query: Object.fromEntries(query.entries()),
    //         };
    //         console.log("Params gửi verify:", params); // Debug

    //         try {
    //             const response = await orderApi.verifyVNPayPayment(params);
    //             console.log("Response verify:", response); // Debug
    //             if (response.data.success) {
    //                 toast.success("Thanh toán thành công!");
    //                 navigate(`/order/${params.orderId}`);
    //             } else {
    //                 toast.error("Thanh toán thất bại: " + response.data.message);
    //                 navigate(`/order/${params.orderId}`);
    //             }
    //         } catch (error) {
    //             console.error("Lỗi xác thực thanh toán:", error);
    //             toast.error("Lỗi khi xác thực thanh toán");
    //             setTimeout(() => navigate('/orders'), 2000);
    //         }
    //     };
    //     verifyPayment();
    // }, [location, navigate]);

    useEffect(() => {
        const verifyPayment = async () => {
            const query = new URLSearchParams(location.search);
            const params = Object.fromEntries(query.entries()); // Gửi toàn bộ query params phẳng
            params.orderId = query.get('vnp_TxnRef');
            params.responseCode = query.get('vnp_ResponseCode');

            console.log("Params gửi verify:", params);

            try {
                const response = await orderApi.verifyVNPayPayment(params);
                console.log("Response verify:", response);
                if (response.data.success) {
                    toast.success("Thanh toán thành công!");
                    setTimeout(() => navigate(`/order/${params.orderId}`), 2000);
                } else {
                    toast.error(`Thanh toán thất bại: ${response.data.message || 'Lỗi không xác định'}`);
                    setTimeout(() => navigate(`/order/${params.orderId}`), 2000);
                }
            } catch (error) {
                console.error("Lỗi xác thực thanh toán:", error.response || error.message || error);
                toast.error(`Lỗi khi xác thực thanh toán: ${error.response?.data?.message || 'Lỗi không xác định'}`);
                setTimeout(() => navigate('/orders'), 2000);
            }
        };
        verifyPayment();
    }, [location, navigate]);

    return (
        <Container className="py-4">
            <Alert variant="info">Đang xác thực thanh toán...</Alert>
            <Button onClick={() => navigate('/orders')}>Quay lại đơn hàng</Button>
        </Container>
    );
}