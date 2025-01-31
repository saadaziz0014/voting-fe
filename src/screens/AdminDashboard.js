import React from "react";
import AdminVoting from "../components/AdminVoting";
import { useNavigate } from "react-router-dom";
import AdminViewIdeas from "../components/AdminViewIdeas";
import img from "../assets/login.png";
import AdminNav from "../components/AdminNav";
export default function AdminDashboard() {
  const navigate = useNavigate();
  function navigation() {
    navigate("/createvote");
  }
  return (
    <>
      <AdminNav></AdminNav>
      <div className="container mt-5">
        <div className="row g-4">
          <AdminVoting></AdminVoting>
          <div className="col-lg-6">
            <div className="card admin-card h-100">
              <div className="card-header admin-header text-center">
                <h4 className="admin-title">Create a Vote</h4>
              </div>
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <img
                  src={img}
                  alt="Vote of the Day"
                  className="img-fluid admin-image mb-3"
                />
                <p className="admin-description">
                  Create a new vote for the stakeholders to vote on.
                </p>
                <button onClick={navigation} className="btn admin-btn">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminViewIdeas></AdminViewIdeas>
      <br></br>
    </>
  );
}
