// src/services/authService.js
import axios from "axios";

const API_URL = 'http://localhost:8080/auth/login';

export const login = async (username, password) => {
    const response = await axios.post(API_URL, {
        username,
        password,
    });

    const { token, user } = response.data.result;
    console.log(response.data.result)
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // lưu thông tin user

    return { authenticated: true, token, user };
};
