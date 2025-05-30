import axiosInstance from './axiosInstance'

const userApi ={
    register :(data)=>{
        return axiosInstance.post(`/users`,data)
    },

    updateUser:(data)=>{
        return axiosInstance.put(`/users/"/update/${userId}`,data)
    },

  
}
export default userApi;