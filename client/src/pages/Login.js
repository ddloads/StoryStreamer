// client/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/pages/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert('Failed to login: ' + error.message);
    }
  };

  return (
    <div className="login">
      <h1>Enter the realm of StoryStreamer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Password:</span>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  );
};

export default Login;
