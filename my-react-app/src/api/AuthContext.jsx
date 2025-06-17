import React, { createContext, useState, useEffect, useContext } from "react";
import { currentUser } from './authApi';
// Tạo context
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Lưu role
  const [token, setToken] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");

        if (savedToken) {
          setToken(savedToken);
          setRole(savedRole);
          setIsLoggedIn(true);
          setIsPrivate(false);
        } else {
          setIsLoggedIn(false);
          setIsPrivate(true);
        }

      } catch (error) {
        console.error("Error reading token from localStorage:", error);
      }
    };

    checkLoginStatus();
  }, []); // Chỉ chạy một lần khi ứng dụng khởi động

  const login = async  (data) => {
    try {
      console.log("Check call api:", data);
      const newToken = data.token;
      const updateRole = data.role;

      console.log("Saved role Update:", updateRole);

      localStorage.setItem("token", newToken);
      localStorage.setItem("role", updateRole);

      setToken(newToken);
      setRole(updateRole); // Cập nhật role ngay lập tức
      setIsLoggedIn(true);
      setIsPrivate(false);
      const userInfo = await currentUser();
      console.log(userInfo.result)
      setUser(userInfo.result);
      localStorage.setItem("user", JSON.stringify(userInfo.result)); // optional

    } catch (error) {
      console.error("Error saving token to localStorage:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setIsPrivate(true);
      setRole(null);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing token from localStorage:", error);
    }
  };

  const resetAuth = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setIsPrivate(true);
      setRole(null);
      setUser(null);
      localStorage.removeItem("user");
      console.log("Đã xóa token và đặt lại trạng thái đăng nhập.");
    } catch (error) {
      console.error("Không thể xóa token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, token, resetAuth ,user}}>
      {children}
    </AuthContext.Provider>
  );
};
