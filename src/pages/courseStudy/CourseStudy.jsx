import React, { useEffect } from "react";
import "./CourseStudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, [fetchCourse, params.id]); // Adding dependencies to avoid unnecessary calls

  return (
    <>
      {course && (
        <div className="course-study-page">
          <img
            src={`http://localhost:5000/${course.image}`}
            alt="Course"
            className="course-image"
          />
          <h2 className="course-title">{course.title}</h2>
          <h4 className="course-description">{course.description}</h4>
          <h5 className="course-creator">by - {course.createdBy}</h5>
          <h5 className="course-duration">
            Duration - {course.duration} weeks
          </h5>
          <Link to={`/lectures/${course._id}`} className="lectures-link">
            <h2>Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
