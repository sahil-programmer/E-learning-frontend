import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import "./dashboard.css";

const AdminDashBoard = ({ user }) => {
  const navigate = useNavigate();

  // Redirect if the user is not an admin
  if (user && user.role !== "admin") {
    navigate("/");
    return null; // Return null to avoid rendering
  }
  const [stats, setStats] = useState([]);
  async function fetchStats() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Layout>
        <div className="dashboard-content">
          <div className="box">
            <p>Total Course</p>
            <p>{stats.totalCourse}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="box">
            <p>Total Users</p>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashBoard;
