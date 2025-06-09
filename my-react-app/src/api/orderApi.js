import axiosInstance from "./axiosInstance";

const orderApi={
    createOrder:(data)=>{
        return axiosInstance.post(`/order/create`,data)
    },

    cancelOrder:(id)=>{
        return axiosInstance.delete(`/order/delete/${id}`)
    },

    getAllOrder:()=>{
        return axiosInstance.get(`/order/all`)
    },

    updateOrder:(orderId,data)=>{
        return axiosInstance.put(`products/update/${orderId}`,data)
    },
}
export default orderApi;