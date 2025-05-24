// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { login } from '../services/authService';
import '../assets/styles/Login.scss'

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const result = await login(username, password);
            if (result.authenticated) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user)); // Lưu user info
                alert('Login successful!');
                window.location.href = '/'; // Redirect về trang chủ
            }
            else {
                setError('Login failed');
            }
        } catch {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='auth-page'>
            <div className="auth-form">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
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
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>

                {error && <p className="error">{error}</p>}

                <div className="auth-options">
                    {isLogin && <button className="forgot">Forgot password?</button>}
                    <button
                        className="toggle"
                        onClick={() => setIsLogin(!isLogin)}
                    >
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
