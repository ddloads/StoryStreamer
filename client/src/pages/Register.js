// client/src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/pages/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      // Automatically log in the user after successful registration
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to home page
      navigate('/');
    } catch (error) {
      alert('Failed to register: ' + error.message);
    }
  };

  return (
    <div className="register">
      <h1>Sign up</h1>
      <p>Sign up to access audiobooks collection</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </label>
        <label>
          <span>Set up your password:</span>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </label>
        <label>
          <span>Confirm password:</span>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            <i
              className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
        </label>
        <button type="submit">Join</button>
      </form>
      <button onClick={() => navigate('/login')}>Already a member? Log in</button>
    </div>
  );
};

export default Register;