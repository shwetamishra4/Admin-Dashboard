import  './style.css'
import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number.');
      return;
    }
    onLogin(email);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {/* <p>Don't have an account? <button onClick={onSignUp}>Sign up</button></p>
      <p>Forgot your password? <button onClick={onResetPassword}>Reset password</button></p> */}
    </div>
  );
};

export default LoginPage;
