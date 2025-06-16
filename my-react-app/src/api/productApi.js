import axiosInstance from "./axiosInstance";

const productApi = {
    getAllProduct: () => {
        return axiosInstance.get("/products")
    },
    getProduct: (productId) => {
        return axiosInstance.get(`/products/${productId}`)
    },
    deleteProduct: (productId) => {
        return axiosInstance.delete(`/products/delete/${productId}`)
    },
    updateProduct: (productId, data) => {
        return axiosInstance.put(`products/${productId}`, data)
    }
}
export default productApi;