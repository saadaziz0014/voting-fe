import React from "react";
import UserNavbar from "../components/UserNavbar";
import Calendar from "../components/Calendar";
import UserVotingTable from "../components/UserVotingTable";
import img from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import CustomCalendar from "../components/CustomCalendar";
export default function UserDashboard() {
  const navigate = useNavigate();
  function navigation() {
    navigate("/ideasubmit");
  }
  return (
    <>
      <UserNavbar></UserNavbar>

      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card twocards-card h-100">
              <div className="card-header twocards-header text-center">
                <h4 className="twocards-title">Deadline Calendar</h4>
              </div>
              <CustomCalendar></CustomCalendar>
            </div>
          </div>
          <UserVotingTable></UserVotingTable>

          <div className="col-lg-12">
            <div className="card twocards-card h-100">
              <div className="row g-0 align-items-center">
                {/* Left: Image */}
                <div className="col-md-4 text-center">
                  <img
                    src={img}
                    alt="Suggest Idea"
                    className="img-fluid twocards-image p-3"
                    style={{ maxHeight: "200px", objectFit: "contain" }} // Optional: Adjust image styling
                  />
                </div>

                {/* Right: Content */}
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="twocards-title mb-3">Suggest Idea</h4>
                    <p className="twocards-description mb-4">
                      Suggest your valuable ideas that might benefit the hedge
                      fund in its policy making.
                    </p>
                    <button onClick={navigation} className="btn twocards-btn">
                      Participate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
