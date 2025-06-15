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
        return axiosInstance.put(`order/update/${orderId}`,data)
    },

    bestSellingProduct:(date)=>{
        return axiosInstance.get(`order/week-best-selling/${date}`)
    },

    weekTotalOrder:(date)=>{
        return axiosInstance.get(`order/week-total/${date}`)
    },

    weekTotalRevenue:(date)=>{
        return axiosInstance.get(`order/week-sale/${date}`)
    },

    weekCancelledOrder:(date)=>{
        return axiosInstance.get(`order/week-cancelled/${date}`)
    },

    getWeeklySales:(date)=>{
        return axiosInstance.get(`order/revenue/weekly/${date}`)
    },

    getMonthlySales:(date)=>{
        return axiosInstance.get(`order/revenue/monthly/${date}`)
    },

    getYearlySales:(date)=>{
        return axiosInstance.get(`order/revenue/yearly/${date}`)
    }
}
export default orderApi;