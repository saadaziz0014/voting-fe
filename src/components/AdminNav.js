import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNav() {
  const navigate = useNavigate();

  // Define onClick handlers to navigate to different pages
  const handleNavigateDashboard = () => {
    navigate("/admindashboard"); // Navigate to Admin Dashboard
  };

  const handleNavigateIdeas = () => {
    navigate("/adminlog"); // Navigate to Admin View Ideas page
  };

  const handleLogout = () => {
    // You can add logout logic here (e.g., clearing local storage or session)
    navigate("/adminlogin"); // Navigate to login page
  };

  return (
    <>
      <nav className="navbar bluenav-navbar">
        <div className="container-fluid">
          {/* Company Name */}
          <a
            href="#"
            className="navbar-brand bluenav-brand"
            onClick={handleNavigateDashboard}
          >
            Admin Dashboard
          </a>

          {/* Right-Side Controls */}
          <div className="d-flex align-items-center">
            {/* User Name */}
            <span className="bluenav-username me-3">Admin</span>

            {/* View Ideas Icon */}
            <a
              href="#"
              className="bluenav-icon-link me-3"
              onClick={handleNavigateIdeas} // Navigate to Ideas page
            >
              <i className="fas fa-book bluenav-icon"></i>
            </a>

            {/* Log Out Icon */}
            <a
              href="#"
              className="bluenav-icon-link"
              onClick={handleLogout} // Log out and navigate to login page
            >
              <i className="fas fa-sign-out-alt bluenav-icon"></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
