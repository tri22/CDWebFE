import axiosInstance from "./axiosInstance";

const orderApi = {
    // createOrder: (data) => {
    //     return axiosInstance.post(`/order/create`, data)
    // },
    getOrderById: (orderId) => {
        return axiosInstance.get(`/order/${orderId}`)
    },

    createOrderFromCart: (data) => {
        return axiosInstance.post(`/order/from-cart`, data);
    },

    cancelOrder: (id) => {
        return axiosInstance.delete(`/order/delete/${id}`)
    },

    getAllOrder: () => {
        return axiosInstance.get(`/order/all`)
    },

    getOrderByUserId: (userId) => {
        return axiosInstance.get(`/order/get-order/${userId}`)
    },

    updateOrder: (orderId, data) => {
        return axiosInstance.put(`/order/update/${orderId}`, data)
    },

    createVNPayPayment: (data) => axiosInstance.post('/api/payment/vnpay/create', data),

    verifyVNPayPayment: (data) => axiosInstance.get('/api/payment/vnpay/return', { data }),
}
export default orderApi;