import axiosInstance from './axiosInstance'

const userApi = {
    register: (data) => {
        return axiosInstance.post(`/users`, data)
    },

    updateUser: (userId, data) => {
        return axiosInstance.put(`/users/update/${userId}`, data)
    },

    getAllUser: () => {
        return axiosInstance.get(`/users/all`)
    },

    deleteUser: (userId) => {
        return axiosInstance.delete(`/users/delete/${userId}`)
    },

}
export default userApi;