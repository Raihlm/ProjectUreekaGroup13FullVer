import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Style/AuthPages.css";

export const Homepage = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="nav">
          <Link to="/signup"> 
            <button className="Signup-button">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </header>
      <main className="main-content">
        <h1>Welcome to</h1>
        <h2>AreYouStunted</h2>
        <div className="content">
          <div className="card">
            <h3>Our Mission</h3>
            <p>
              Is to provide people, mainly parents, doctors, and local hospitals, 
              the means to quickly identify stunting in a child for free.
            </p>
          </div>
          <img src="/doctor.jpg" alt="Doctor with patient" className="image" />
        </div>
        <div className="content">
          <img src="/baby.jpg" alt="Happy baby" className="image" />
          <div className="card">
            <h3>Our Vision</h3>
            <p>
              A world where every individual, regardless of background or income, 
              has access to free, reliable tools to detect and prevent stunting, ensuring 
              healthier futures for children and communities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Harap isi email dan password!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    
    navigate("/pengukuran");
  };

  return (
    <div
      className="auth-container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ff758c, #ff7eb3)", 
      }}
    >
      <h1>Let's Get Started!</h1>
      <div className="auth-box">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <a href="#" className="forgot-password">Forgot password?</a>
      </div>
    </div>
  );
};


export const Signup = () => {
  return (
    <div
      className="auth-container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ff758c, #ff7eb3)",
      }}
    >
      <h1>Let's Get Started!</h1>
      <div className="auth-box">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <Link to="/">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

