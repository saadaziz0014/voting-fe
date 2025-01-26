import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();

  // Navigate to the settings page
  const settingsClicked = () => {
    navigate("/voting/settings");
  };

  // Navigate to the user dashboard
  const dashboardClicked = () => {
    navigate("/voting/userdashboard");
  };

  const ideasClicked = () => {
    navigate("/voting/userideas");
  };
  // Navigate to the login page (logout functionality)
  const logoutClicked = () => {
    sessionStorage.clear();

    navigate("/voting/login");
  };

  return (
    <>
      <nav className="navbar usernav-navbar">
        <div className="container-fluid">
          <a
            onClick={dashboardClicked}
            className="navbar-brand usernav-brand"
          >
            Voting Dashboard
          </a>
          <div className="d-flex align-items-center">
            <span className="usernav-username me-3">John Doe</span>
            <a
              onClick={ideasClicked}
              className="usernav-icon-link me-3"
            >
              <i className="fas fa-lightbulb usernav-icon"></i>
            </a>
            <a
              onClick={settingsClicked}
              className="usernav-icon-link me-3"
            >
              <i className="fas fa-cog usernav-icon"></i>
            </a>
            <a onClick={logoutClicked} className="usernav-icon-link">
              <i className="fas fa-sign-out-alt usernav-icon"></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
