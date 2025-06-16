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

    addVoucher:(data)=>{
        return axiosInstance.post('/vouchers/add',data)
    },

    updateVoucher:(id,data)=>{
        return axiosInstance.put(`/vouchers/update/${id}`,data)
    },

    deleteVoucher:(id)=>{
        return axiosInstance.delete(`/vouchers/delete/${id}`)
    },

    getAllLog:()=>{
        return axiosInstance.get('/log/all')
    }
    
}
export default adminApi;