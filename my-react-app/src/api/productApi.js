import axiosInstance from "./axiosInstance";

const productApi={
    getAllProduct:()=>{
        return axiosInstance.get("/products")
    },
    deleteProduct:(productId)=>{
        return axiosInstance.delete(`/products/delete/${productId}`)
    },
    updateProduct:(productId,data)=>{
        return axiosInstance.put(`products/update/${productId}`,data)
    }
}
export default productApi;