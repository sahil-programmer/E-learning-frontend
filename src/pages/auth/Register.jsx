import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { UserData } from "../../context/UserContext"; // Import UserData context

const Register = () => {
  const { RegisterUser, btnLoading } = UserData(); // Use context for registering user
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // Navigation hook

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await RegisterUser(name, email, password, navigate); // Call RegisterUser function from context
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name} // Bind state to input
            onChange={(e) => setName(e.target.value)} // Update state on input change
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email} // Bind state to input
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} // Bind state to input
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
            required
          />
        </div>
        <button type="submit" disabled={btnLoading}>
          {btnLoading ? "Registering..." : "Register"}{" "}
          {/* Show loading state */}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
