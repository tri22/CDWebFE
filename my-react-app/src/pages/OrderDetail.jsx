import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Table } from 'react-bootstrap';

const sampleOrderDetail = {
    id: 1,
    user: { fullName: 'Nguyen Van A', email: 'a@gmail.com', phone: '0901234567', address: '123 Đường ABC' },
    totalPrice: 500000,
    totalQuantity: 3,
    orderDate: '2024-05-10',
    shippingFee: 30000,
    note: 'Giao hang gio hanh chinh',
    paymentMethod: { name: 'Thanh toán khi nhận hàng' },
    details: [
        {
            id: 1,
            product: { name: 'Áo sơ mi', price: 200000, image: 'https://via.placeholder.com/100' },
            quantity: 1,
            state: 'Đã giao',
            address: '123 Đường ABC'
        },
        {
            id: 2,
            product: { name: 'Quần jeans', price: 150000, image: 'https://via.placeholder.com/100' },
            quantity: 2,
            state: 'Đã giao',
            address: '123 Đường ABC'
        },
    ],
};
export default function OrderDetail() {
    const { id } = useParams();
    const order = sampleOrderDetail;

    return (
        <Container className="order-detail-container">
            <h2>Chi tiết đơn hàng #{id}</h2>
            <Card>
                <Card.Body>
                    <p><strong>Khách hàng:</strong> {order.user.fullName}</p>
                    <p><strong>Email:</strong> {order.user.email}</p>
                    <p><strong>Số điện thoại:</strong> {order.user.phone}</p>
                    <p><strong>Địa chỉ:</strong> {order.details[0].address}</p>
                    <p><strong>Ghi chú:</strong> {order.note}</p>
                    <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod.name}</p>
                    <p><strong>Ngày đặt hàng:</strong> {order.orderDate}</p>

                    <Table responsive bordered className="mt-4">
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.details.map((item) => (
                                <tr key={item.id}>
                                    <td><img src={item.product.image} alt="img" width={80} /></td>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.price.toLocaleString()} VND</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.state}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}