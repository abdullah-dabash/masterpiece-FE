import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username: email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            alert('Invalid credentials');
        }
    };

    return (
        <section className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated neon lines */}
            <svg className="absolute inset-0 w-full h-full">
                <motion.line
                    x1="0%" y1="0%" x2="100%" y2="100%"
                    stroke="url(#neonGradient)" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.line
                    x1="100%" y1="0%" x2="0%" y2="100%"
                    stroke="url(#neonGradient)" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                />
                <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff00ff">
                            <animate attributeName="stop-color" values="#ff00ff; #00ffff; #ff00ff" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#00ffff">
                            <animate attributeName="stop-color" values="#00ffff; #ff00ff; #00ffff" dur="4s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>
            </svg>

            {/* Glowing cursor effect */}
            <motion.div
                className="glow"
                style={{
                    position: 'absolute',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
                animate={{
                    x: mousePosition.x - 150,
                    y: mousePosition.y - 150,
                }}
            />

            <div className="w-full max-w-md z-10">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-900 rounded-lg shadow-neon p-8"
                >
                    <Link to="/" className="flex items-center justify-center mb-6 text-2xl font-semibold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">HighEndJo</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-center mb-2">Sign in to your account</h1>
                    <p className="text-center text-gray-400 mb-6">Welcome back! 👋</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Your email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-white font-semibold rounded-lg shadow-neon hover:shadow-neon-intense focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                        >
                            Sign in
                        </button>
                    </form>
                    <p className="text-sm text-gray-400 mt-6 text-center">
                        Don't have an account yet? <Link to="/signup" className="font-medium text-blue-500 hover:underline">Sign up</Link>
                    </p>
                </motion.div>
            </div>

            <style jsx>{`
                .shadow-neon {
                    box-shadow: 0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.5);
                }
                .shadow-neon-intense {
                    box-shadow: 0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.8);
                }
                .glow {
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                }
            `}</style>
        </section>
    );
}

export default Login;