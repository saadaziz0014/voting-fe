import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";
import Swal from "sweetalert2";
import { DotLoader } from "react-spinners";


export default function Settings() {


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

  const userId = sessionStorage.getItem("userId");
  const [user, setUser] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    wallet: "",
    network: "",
    fund: "",
    userId: userId,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [timer, setTimer] = useState(120);
  const [otp, setOtp] = useState("");

  const [inputs, setInputs] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    wallet: "",
    network: "",
    fund: "",
    userId: userId,
  });
  const fetchUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/get-user", { userId });

      if (response.status === 200) {
        setInputs(response.data);
        setUser(response.data);
        console.log("User fetched successfully:", response.data);
      } else {
        console.error("Failed to fetch user.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
      console.log(user);
    }
  }, [userId]);

  const handleVerifyOTP = async (otpInput) => {
    try {
      console.log("sending otp", otpInput);
      const response = await axios.post("http://localhost:5000/api/users/verify-change-details", {
        otp: otpInput,
      });


      if (response.status === 200) {
        setOtpModal(false);
        setOtp("");
        Swal.fire({
          icon: "success",
          title: "Details Updated",
          text: "Your details have been successfully updated.",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "The OTP you entered is incorrect or has expired.",
      });
    }
    fetchUser();
  };

  const handleChange = (e) => {
    setInputs({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (field, value) => async (e) => {
    e.preventDefault();

    if (!value || value.trim() === "") {
      toast.error('The field cannot be empty.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
      return;
    }

    if (field === "password" && value.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/users/change-details", {
        ...inputs,
        userId,
      });

      if (response.status === 200) {
        setOtpModal(true);
        setTimer(120);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "Please check your email for the OTP.",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to send OTP. Please try again.",
      });
    }
    setInputs({ ...inputs, [field]: "" });
    fetchUser();

  };

  const showOtpModal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h5>Enter OTP</h5>
          <input
            type="text"
            className="otp-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <p>OTP will expire in {timer} seconds</p>
          <button
            className="modal-button"
            onClick={() => handleVerifyOTP(otp)}
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
        Swal.fire({
          icon: "error",
          title: "OTP Expired",
          text: "Your OTP has expired. Please try again.",
        });
        setOtpModal(false);
        setOtp("");
      }
    }
    return () => clearInterval(countdown);
  }, [otpModal, timer]);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <UserNavbar></UserNavbar>
      <div className="container mt-5">
        <div className="card settings-card">
          <div className="card-header settings-header">
            <h3 className="settings-header-title">Account Settings</h3>
          </div>
          <div className="card-body">

            {/* Email Change */}
            <div className="col-md-12 settings-option">
              <h5 className="settings-option-title text-center">Email</h5> {/* Added text-center */}
              <form onSubmit={handleSubmit("email", inputs.email)}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control settings-input text-center" // Add the w-100 class here
                    placeholder="Enter new email"
                    value={inputs.email}
                    onChange={handleChange}
                    disabled={true}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="row">
              {/* First Name Change */}
              <div className="col-md-6 settings-option">
                <h5 className="settings-option-title">Change First Name</h5>
                <form onSubmit={handleSubmit("firstName", inputs.firstName)}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control settings-input"
                      placeholder="Enter new first name"
                      value={inputs.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn settings-btn">
                    Save
                  </button>
                </form>
              </div>

              {/* Last Name Change */}
              <div className="col-md-6 settings-option">
                <h5 className="settings-option-title">Change Last Name</h5>
                <form onSubmit={handleSubmit("lastName", inputs.lastName)}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="surname"
                      className="form-control settings-input"
                      placeholder="Enter new last name"
                      value={inputs.surname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn settings-btn">
                    Save
                  </button>
                </form>
              </div>

              {/* Address Change */}
              <div className="col-md-6 settings-option">
                <h5 className="settings-option-title">Change Address</h5>
                <form onSubmit={handleSubmit("address", inputs.address)}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="address"
                      className="form-control settings-input"
                      placeholder="Enter new address"
                      value={inputs.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn settings-btn">
                    Save
                  </button>
                </form>
              </div>

              {/* Coin12 Address Change */}
              <div className="col-md-6 settings-option">
                <h5 className="settings-option-title">Change Coin12 Address</h5>
                <form
                  onSubmit={handleSubmit("coin12Address", inputs.wallet)}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      name="wallet"
                      className="form-control settings-input"
                      placeholder="Enter new Coin12 address"
                      value={inputs.wallet}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn settings-btn">
                    Save
                  </button>
                </form>
              </div>

              {/* Network Details Change */}
              <div className="col-md-6 settings-option">
                <h5 className="settings-option-title">
                  Change Network Details
                </h5>
                <form
                  onSubmit={handleSubmit(
                    "networkDetails",
                    user.network
                  )}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      name="network"
                      className="form-control settings-input"
                      placeholder="Enter new network details"
                      value={inputs.network}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn settings-btn">
                    Save
                  </button>
                </form>
              </div>
              {/* Network Details Change */}
              <div className="col-md-6 settings-option">
                <h5 className="settings-option-title">
                  Change Fund Name
                </h5>
                <form
                  onSubmit={handleSubmit(
                    "fundDetails",
                    user.fund
                  )}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fund"
                      className="form-control settings-input"
                      placeholder="Enter new network details"
                      value={inputs.fund}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn settings-btn">
                    Save
                  </button>
                </form>
              </div>

              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <div className="col-md-6 settings-option">
                  <h5 className="settings-option-title">Change Password</h5>
                  <form onSubmit={handleSubmit("password", inputs.password)}>
                    <div className="col-md-6 mb-3 input-group">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        className="form-control settings-input text-center"
                        placeholder="Enter new password"
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? "Hide" : "Show"}
                      </button>
                    </div>
                    <button type="submit" className="btn settings-btn">
                      Save
                    </button>
                  </form>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {otpModal && showOtpModal()}
      {loading && (
        <div style={overlayStyle}>
          <DotLoader size={100} color={"#218838 "} />
        </div>
      )}

    </>
  );
}
