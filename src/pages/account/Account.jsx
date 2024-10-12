import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTachometerAlt } from "react-icons/fa"; // Importing icons
import "./account.css";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="account-section">
      {user && (
        <div className="account-container">
          <h1>My Account</h1>
          <div className="account-details">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="button-group">
            <button
              className="common-btn"
              onClick={() => navigate(`/${user._id}/dashboard`)}
            >
              <FaTachometerAlt /> Go to Dashboard
            </button>
            {user.role === "admin" && (
              <button
                className="common-btn"
                onClick={() => navigate(`/admin/dashboard`)}
              >
                <FaTachometerAlt /> Admin Dashboard
              </button>
            )}
            <button className="common-btn logout-btn" onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
