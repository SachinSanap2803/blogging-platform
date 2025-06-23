import axios from 'axios';
import { useState } from 'react';
import '../styles/Login.css';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            alert('Login successful!');
        } catch (err) {
            alert(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login to Your Blog</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="login-input"
                    />
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>
                </form>
                <p className="login-footer">
                    Don’t have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;