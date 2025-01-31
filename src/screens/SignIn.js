import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for making API requests
import img from "../assets/login.png";
//import ReactLoading from 'react-loading';
import { BeatLoader, SyncLoader, RingLoader, PacmanLoader, DotLoader } from 'react-spinners'; // You can choose from various types like ClipLoader, BeatLoader, etc.




export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [timer, setTimer] = useState(60); // Initial countdown timer
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const overlayStyle = {
    position: 'fixed', // Ensure it covers the entire screen
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's on top of everything
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make the API call to the signIn endpoint
      const response = await axios.post("http://localhost:5000/api/users/Login", { email, password });

      if (response.status === 200) {
        toast.success("Login successful! OTP sent to your email.", { autoClose: 1000 });
        setOtpModal(true);
        setLoading(false);
        setTimer(180); // Start OTP timer for 5 minutes
      }

    } catch (error) {
      setLoading(false)
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { autoClose: 1000 });
      } else {
        toast.error("Error signing in!", { autoClose: 1000 });
      }
    }
  };

  const handleVerifyOTP = async (otpInput) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/Login-Verify", { otp: otpInput });

      if (response.status === 200) {
        toast.success("OTP verified successfully!", { autoClose: 500 });
        setOtpModal(false);

        sessionStorage.setItem("userId", response.data.user.userId);
        sessionStorage.setItem("userFirstName", response.data.user.firstName);
        sessionStorage.setItem("userEmail", response.data.user.email);
        setTimeout(() => navigate("/userdashboard"), 2000); // Navigate to the user dashboard after verification
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Invalid OTP. Try again.", { autoClose: 500 });
      } else {
        toast.error("Error verifying OTP. Please try again later.", { autoClose: 500 });
      }
    }
  };

  const showOtpModal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h5>Enter OTP</h5>
          <input
            type="text"
            className="otp-input"
            id="otp-input"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <p>OTP will expire in {timer} seconds</p>
          <button
            className="modal-button"
            onClick={async () => {
              const otpInput = document.getElementById("otp-input").value;
              setOtp(otpInput);
              await handleVerifyOTP(otpInput);
            }}
          >
            Verify OTP
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    let countdown;
    if (otpModal && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(countdown);
      if (timer === 0) {
        setOtpModal(false);
        setOtp("");
      }
    }
    return () => clearInterval(countdown);
  }, [otpModal, timer]);

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card signin-card d-flex flex-row">
          <div className="signin-left d-flex flex-column align-items-center justify-content-center">
            <img src={img} alt="Rest with Dignity" className="signin-image" />
            <h2 className="signin-title">Voting Made Easy</h2>
            <p className="signin-text">Secure and easy voting solution.</p>
          </div>

          <div className="signin-right p-4">
            <h3 className="signin-form-title text-center">User Sign-In</h3>
            <p className="signin-form-subtitle text-center">
              Enter your credentials
            </p>
            <form className="signin-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="signin-email"
                  className="form-label signin-label"
                >
                  Email or ID
                </label>
                <input
                  type="text"
                  className="form-control signin-input"
                  id="signin-email"
                  placeholder="Enter your email or ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="signin-password"
                  className="form-label signin-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control signin-input"
                  id="signin-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn signin-btn w-100">
                Sign In
              </button>
            </form>
            <p className="signin-footer-text text-center mt-3">
              Don't have an account?{" "}
              <a href="" className="signin-link">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div >

      {otpModal && showOtpModal()
      }
      {
        loading && (
          <div style={overlayStyle}>
            <DotLoader size={100} color={"#218838 "} />
          </div>
        )
      }
    </>
  );
}
