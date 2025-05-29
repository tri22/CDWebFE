import axiosInstance from "./axiosInstance";

const orderApi={
    createOrder:(data)=>{
        return axiosInstance.post(`/order/create`,data)
    },

    cancelOrder:(id)=>{
        return axiosInstance.delete(`/order/delete/${id}`)
    }
}
export default orderApi;