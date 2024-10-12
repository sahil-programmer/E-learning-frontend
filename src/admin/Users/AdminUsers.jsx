import React, { useEffect, useState } from "react";
import Layout from "../Utils/Layout";
import "./AdminUsers.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  // Redirect non-admin users
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  // Function to fetch users
  async function fetchUsers() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
      setFilteredUsers(data.users); // Initially, all users are displayed
    } catch (e) {
      console.log(e);
    }
  }

  // Function to handle search
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter users based on the search term (name or email)
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="admin-users-page">
        <h1>Admin User Management</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        {/* Users Table */}
        {filteredUsers && filteredUsers.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th> {/* This is the index column */}
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td> {/* Index column */}
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </Layout>
  );
};

export default AdminUsers;
