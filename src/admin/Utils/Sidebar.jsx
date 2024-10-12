import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Common.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">
            <div className="icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/course">
            <div className="icon">
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <span>Courses</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <div className="icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to="/account">
            <div className="icon">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
            <span>LogOut</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
