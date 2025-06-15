import axiosInstance from "./axiosInstance";

const adminApi = {
    getAllStockInRecord: () => {
        return axiosInstance.get(`/stock-in/all`)
    },
    getRemain: () => {
        return axiosInstance.get(`/stock-in/remain`)
    },

    getAllVoucher:()=>{
        return axiosInstance.get('/vouchers/all')
    },

    
}
export default adminApi;