import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.scss'
import { loginApi, registerApi } from '../api/authApi';
import { useAuth } from '../api/AuthContext.jsx';

const LoginPage = () => {
    const errorMessages = {
        USERNAME_INVALID: "Tên đăng nhập phải có ít nhất 3 ký tự.",
        PASSWORD_INVALID: "Mật khẩu phải có ít nhất 8 ký tự.",
    };
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, role } = useAuth();
    const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();
        const trimmedEmail = email.trim();

        // Kiểm tra phía client trước
        const newFieldErrors = {};
        if (trimmedUsername.length < 3) {
            newFieldErrors.username = "USERNAME_INVALID";
        }
        if (trimmedPassword !== 'admin' && trimmedPassword.length < 8) {
            newFieldErrors.password = "PASSWORD_INVALID";
        }
        if (!isLogin && !trimmedEmail) {
            newFieldErrors.email = "Email không được để trống.";

        }
        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors); // Gán lỗi để hiển thị
            return; // Không gọi API nếu chưa hợp lệ
        }

         if (isLogin) {
            // Xử lý đăng nhập
            try {
                const data = await loginApi({ username: trimmedUsername, password: trimmedPassword });
                if (data.token) {
                    login(data);
                    setIsLogin(true);
                } else {
                    setError("Username or password is incorrect");
                }
            } catch (err) {
                if (err.response?.data?.result && typeof err.response.data.result === 'object') {
                    setFieldErrors(err.response.data.result);
                } else {
                    setError("Login failed!");
                }
            }
        } else {
            // Xử lý đăng ký
            try {
                const data = await registerApi({
                    username: trimmedUsername,
                    password: trimmedPassword,
                    email: trimmedEmail,
                });
                alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
                setIsLogin(true); // chuyển về form login
            } catch (err) {
                if (err.response?.data?.result && typeof err.response.data.result === 'object') {
                    setFieldErrors(err.response.data.result);
                } else {
                    setError("Đăng ký thất bại!");
                }
            }
        }
    };

    useEffect(() => {
        if (role) { // Kiểm tra nếu role đã được cập nhật
            switch (role) {
                case 'ADMIN':
                    navigate('/AdminHome')
                    break;
                case 'USER':
                    navigate('/');
                    break;
                default:
                    alert("Login failed! Check your username and password.");
                    break;
            }
        }
    }, [role, navigate]);



    return (
        <div className='auth-page'>
            <div className="auth-form">
                <h2>{isLogin ? 'Login' : 'REGISTER'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setFieldErrors((prev) => ({ ...prev, username: null })); // clear lỗi khi nhập lại
                        }}
                        required
                    />
                    {fieldErrors.username && (
                        <p className="error-text">
                            {errorMessages[fieldErrors.username] || fieldErrors.username}
                        </p>
                    )}
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setFieldErrors((prev) => ({ ...prev, password: null }));
                            }}
                            required
                        />

                        {fieldErrors.password && (
                            <p className="error-text">
                                {errorMessages[fieldErrors.password] || fieldErrors.password}
                            </p>
                        )}
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>

                {error && <p className="error">{error}</p>}

                <div className="auth-options">
                    {isLogin && <button className="forgot">Forgot password?</button>}
                    <button className="toggle" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Create an account' : 'Already have an account?'}
                    </button>
                    <div className="google-login">
                        <button className="google-btn">
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
