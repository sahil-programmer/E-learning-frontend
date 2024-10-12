import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);
  async function fetchCourses() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/course/all");
      setCourses(data.courses);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/course/${id}`
      );
      console.log(data.course);
      setCourse(data.course);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/myCourses`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyCourse(data.courses);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
export const CourseData = () => useContext(CourseContext);
