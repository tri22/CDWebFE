import { data } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const cartApi = {
    addToCart: (data) => {
        return axiosInstance.post(`/cart/add-item`,data)
    },

    removeCartItem: (productId) => {
        return axiosInstance.delete(`/cart/delete-item/${productId}`)
    },

    getCart: () => {
        return axiosInstance.get(`/cart`)
    },
}
export default cartApi;