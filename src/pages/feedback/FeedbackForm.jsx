// FeedbackForm.js
import React, { useState } from "react";
import axios from "axios";
import "./feedback.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5, // Default rating
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/submit",
        formData
      );
      alert(response.data.message);
      setFormData({ name: "", email: "", message: "", rating: 5 }); // Reset form
      navigate("/"); // Navigate to home
    } catch (error) {
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Feedback"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`star ${formData.rating >= num ? "filled" : ""}`}
              onClick={() => handleStarClick(num)}
              role="button"
              tabIndex="0"
              onKeyPress={() => handleStarClick(num)} // Accessibility
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
