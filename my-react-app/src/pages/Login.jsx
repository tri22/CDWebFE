import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.scss'
import { loginApi } from '../api/authApi';
import { useAuth } from '../api/AuthContext.jsx';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, role } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const userLogin = {
            username: username.trim(),
            password: password.trim(),
        };

        console.log(userLogin)
        try {
            const data = await loginApi(userLogin); // Gọi API đăng nhập
            if (data.token) {
                login(data); // Cập nhật role và token ngay lập tức
                setIsLogin(true)
            } else {
                alert("Login failed! Check your username and password.");
            }
        } catch (error) {
            alert("Login failed! Check your username and password.");
            console.error("Login Error:", error);
        }
    };

    useEffect(() => {
        if (role) { // Kiểm tra nếu role đã được cập nhật
            switch (role) {
                case 'ADMIN':
                    navigate('/ADMIN')
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
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
