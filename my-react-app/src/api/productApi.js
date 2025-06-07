import axiosInstance from "./axiosInstance";

const productApi={
    getAllProduct:()=>{
        return axiosInstance.get("/products")
    }
}
export default productApi;