import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./adminCourses.css";
import axios from "axios";
import toast from "react-hot-toast";

const categories = [
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Digital Marketing",
  "Graphic Design",
  "Business",
  "Photography",
  "Music",
  "Personal Development",
  "Health & Fitness",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courses, fetchCourses } = CourseData();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePrev(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage("");
    setImagePrev(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    if (image) {
      myForm.append("file", image);
    }

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/courses/new`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      console.log(data);
      // Optional: Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice(0);
      setCreatedBy("");
      setDuration("");
      setImage("");
      setImagePrev(false);
      setBtnLoading(false);
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses-page">
        <div className="add-course-form">
          <button className="submit-btn" onClick={() => setIsModalOpen(true)}>
            Add Course
          </button>
        </div>

        <div className="courses-list">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((item) => <CourseCard key={item._id} course={item} />)
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className={`modal-content ${isModalOpen ? "show" : ""}`}>
              <h2>Add Course</h2>
              <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                  <label htmlFor="title">Course Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="createdBy">Created By:</label>
                  <input
                    type="text"
                    id="createdBy"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration (in hours):</label>
                  <input
                    type="text"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Upload Image:</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePrev && (
                    <div>
                      <img
                        src={imagePrev}
                        alt="Preview"
                        className="image-preview"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{ marginTop: "10px" }} // Space between image and button
                      >
                        Remove Photo
                      </button>
                    </div>
                  )}
                </div>

                <div className="button-container">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={btnLoading}
                  >
                    {btnLoading ? "Please Wait..." : "Create Course"}
                  </button>
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={() => setIsModalOpen(false)}
                    style={{ marginLeft: "10px" }} // Space between buttons
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminCourses;
