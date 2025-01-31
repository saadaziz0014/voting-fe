import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DotLoader } from "react-spinners";

export default function SignUp() {
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



  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    wallet: "",
    network: "",
    fund: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [otpModal, setOtpModal] = useState(false);
  const [timer, setTimer] = useState(60); // Initial countdown timer
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      firstName,
      surname,
      wallet,
      network,
      fund,
      email,
      password,
      confirmPassword,
      address,
    } = formData;

    if (
      !firstName ||
      !surname ||
      !wallet ||
      !network ||
      !fund ||
      !email ||
      !password ||
      !confirmPassword ||
      !address
    ) {
      toast.error("All fields are required!", { autoClose: 1000 });
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!", {
        autoClose: 1000,
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { autoClose: 1000 });
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Sign up successful! OTP sent to your email.");
        setOtpModal(true);
        setTimer(60); // Set timer to 5 minutes for OTP expiry
      } else {
        toast.error(data.message || "Sign up failed. Try again.");
      }

      setLoading(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otpInput) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp: otpInput }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified! Account created.");
        setOtpModal(false);
        navigate("/login");
      } else {
        toast.error(data.message || "Invalid OTP. Try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleChangeEmail = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
      if (response.ok) {
        toast.success("Email changed. Please sign up again.");
        setOtpModal(false);
        setFormData((prev) => ({ ...prev, email: "" }));
      } else {
        toast.error("Failed to change email. Try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSignUp();
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
          <button
            className="modal-button cancel-button"
            onClick={handleChangeEmail}
          >
            Change Email
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
        <div className="card signup-card">
          <div className="card-header text-center signup-title">Sign Up</div>
          <div className="card-body signup-scroll">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="signup-name" className="form-label signup-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control signup-input"
                  id="signup-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-surname" className="form-label signup-label">
                  Surname
                </label>
                <input
                  type="text"
                  className="form-control signup-input"
                  id="signup-surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Enter your surname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-wallet" className="form-label signup-label">
                  Coin12 Address
                </label>
                <input
                  type="text"
                  className="form-control signup-input"
                  id="signup-wallet"
                  name="wallet"
                  value={formData.wallet}
                  onChange={handleChange}
                  placeholder="Enter wallet address"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-network" className="form-label signup-label">
                  Network
                </label>
                <input
                  type="text"
                  className="form-control signup-input"
                  id="signup-network"
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                  placeholder="Enter network details"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-fund" className="form-label signup-label">
                  Fund Name
                </label>
                <input
                  type="text"
                  className="form-control signup-input"
                  id="signup-fund"
                  name="fund"
                  value={formData.fund}
                  onChange={handleChange}
                  placeholder="Enter hedge fund name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-email" className="form-label signup-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control signup-input"
                  id="signup-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-password" className="form-label signup-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control signup-input"
                  id="signup-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-confirm-password" className="form-label signup-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control signup-input"
                  id="signup-confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-address" className="form-label signup-label">
                  Residential Address
                </label>
                <textarea
                  className="form-control signup-input"
                  id="signup-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="card-footer text-center signup-card-footer">
            <button onClick={handleSubmit} className="btn signup-btn w-100">
              Sign Up
            </button>
            <p className="signup-footer-text">
              Already have an account?{" "}
              <a
                href="#"
                className="signup-link"
                onClick={() => navigate("/login")}
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
      {otpModal && showOtpModal()}
      {loading && (
        <div style={overlayStyle}>
          <DotLoader size={100} color={"#218838 "} />
        </div>
      )}
    </>
  );
}
