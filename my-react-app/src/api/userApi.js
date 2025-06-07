import axiosInstance from './axiosInstance'

const userApi ={
    register :(data)=>{
        return axiosInstance.post(`/users`,data)
    },

    updateUser:(data)=>{
        return axiosInstance.put(`/users/"/update/${userId}`,data)
    },

    getAllUser:()=>{
        return axiosInstance.get(`/users/all`)
    },
  
}
export default userApi;