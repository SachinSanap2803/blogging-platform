import axios from 'axios';
import { useState } from 'react';
import '../styles/register.css'; // Import your new CSS file

function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', form);
            alert('Registration successful! You can now login.');
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Register for Blogging</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="register-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="register-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="register-input"
                    />
                    <button
                        type="submit"
                        className="register-button"
                    >
                        Register
                    </button>
                </form>
                <p className="register-footer">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;