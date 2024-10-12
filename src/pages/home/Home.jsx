import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import imageSrc from "../../assets/1.png";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to Our E-Learning Platform!</h1>
          <p>
            Unlock your potential with our comprehensive courses designed to
            enhance your knowledge and skills. Join a community of learners and
            start your journey today!
          </p>
          <p>
            Whether you're looking to boost your career, learn a new skill, or
            explore your passions, we offer a wide range of courses tailored to
            your needs. Our expert instructors are here to guide you every step
            of the way, providing personalized support and resources to ensure
            your success.
          </p>
          <p>
            Join thousands of satisfied students who have transformed their
            lives through our innovative online learning experiences. Don't
            wait—take the first step towards achieving your goals today!
          </p>
          <button onClick={() => navigate("/courses")}>Get Started</button>
        </div>

        {/* Add an animated image */}
        <div className="home-image">
          <img
            src={imageSrc}
            alt="E-Learning illustration"
            className="animated-image"
          />
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
