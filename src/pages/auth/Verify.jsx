import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { UserData } from "../../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState(""); // State to store OTP
  const { btnLoading, verifyOtp } = UserData(); // Getting required functions and loading state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert OTP to number and call verifyUser with OTP and navigation
      await verifyOtp(Number(otp), navigate);
      console.log("OTP submitted:", otp);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp} // Bind OTP input to state
            onChange={(e) => setOtp(e.target.value)} // Update OTP state when input changes
            required
          />
        </div>
        <button type="submit" disabled={btnLoading}>
          {btnLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
      <p>
        Didn't receive an OTP? <Link to="/resend-otp">Resend OTP</Link>
      </p>
    </div>
  );
};

export default Verify;
