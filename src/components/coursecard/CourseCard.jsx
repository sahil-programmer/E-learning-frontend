import React from "react";
import "./coursecard.css";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import toast from "react-hot-toast";
import axios from "axios";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();
  const deleteHandler = async (id) => {
    try {
      if (confirm("Are you sure to delete this course")) {
        const { data } = await axios.delete(
          `http://localhost:5000/api/course/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchCourses();
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="course-card">
      <img
        src={`${server}/${course.image}`}
        className="course-image"
        alt={course.title}
      />
      <div className="course-info">
        <h3>{course.title}</h3>
        <p>Instructor: {course.createdBy}</p>
        <p>Duration: {course.duration} weeks</p>
        <p>Price: ₹{course.price}</p>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn"
                  >
                    Get Started
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="common-btn"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button onClick={() => navigate(`/login`)} className="common-btn">
            Get Started
          </button>
        )}

        {user && user.role === "admin" && (
          <>
            <br />
            <button
              onClick={() => deleteHandler(course._id)}
              className="common-btn"
              style={{ background: "red" }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
