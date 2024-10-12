import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        <h1>About Our E-Learning Platform</h1>
        <p>
          Our e-learning platform is dedicated to helping students,
          professionals, and lifelong learners reach their full potential. With
          expertly crafted courses, interactive lessons, and a vibrant
          community, we make learning engaging and accessible to everyone.
        </p>

        <div className="features">
          <div className="feature-item">
            <h2>Expert Instructors</h2>
            <p>
              Learn from industry experts and experienced educators who bring
              practical knowledge to each course.
            </p>
          </div>

          <div className="feature-item">
            <h2>Interactive Learning</h2>
            <p>
              Engage in interactive lessons, quizzes, and assignments designed
              to reinforce learning and test your skills.
            </p>
          </div>

          <div className="feature-item">
            <h2>Flexible Schedules</h2>
            <p>
              Study at your own pace, on your own time. Our platform is
              accessible anytime, anywhere.
            </p>
          </div>

          <div className="feature-item">
            <h2>Certifications</h2>
            <p>
              Earn certifications upon course completion to showcase your
              knowledge and skills to future employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
