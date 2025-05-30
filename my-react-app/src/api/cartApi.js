import { data } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const cartApi = {
    addToCart: (data) => {
        return axiosInstance.post(`/cart/add-item`, data)
    },

    removeCartItem: (data) => {
        return axiosInstance.delete(`/cart/delete-item`, data)
    },

    getCart: () => {
        return axiosInstance.get(`/cart`)
    },
}
export default cartApi;