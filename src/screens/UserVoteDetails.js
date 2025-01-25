import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserNavbar from "../components/UserNavbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { DotLoader } from "react-spinners";
export default function UserVoteDetails() {

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





  const location = useLocation();
  const [otpModal, setOtpModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Track vote type
  const [timer, setTimer] = useState(120); // Initial countdown timer
  const [otp, setOtp] = useState("");
  const { idea } = location.state || {};
  const voteId = idea._id;
  const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("userEmail");
  const userFirstName = sessionStorage.getItem("userFirstName");

  const [hasVoted, setHasVoted] = useState(false); // Track if user has voted
  const [castedVote, setCastedVote] = useState(null);

  useEffect(() => {

    checkvote();
  }, [userId, voteId]); // Add dependencies to prevent unnecessary re-renders 
  const checkvote = async () => {
    try {
      console.log('Checking vote for user:', userId, 'and vote:', voteId);
      const response = await axios.post(
        "http://localhost:5000/api/users/check-vote",
        { userId, voteId } // Send data in the body
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("In Response");
        setHasVoted(true);
        setCastedVote(response.data);
      }
    } catch (error) {
      console.error("Error checking vote:", error);
    }
  };


  const handleProvideFeedback = async () => {
    const { value: feedback } = await Swal.fire({
      title: "Provide Feedback",
      input: "textarea",
      inputLabel: "Your Comment",
      inputPlaceholder: "Type your comment here...",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    });

    if (feedback) {
      try {
        // API call to send feedback to the server
        const response = await axios.post(
          "http://localhost:5000/api/users/give-feedback",
          {
            userId, // Assuming `userId` is a useState variable
            voteId, // Passed as a parameter to the function
            userEmail, // Assuming `userEmail` is a useState variable
            feedback,
            userFirstName, // User feedback from Swal
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Feedback Submitted",
            text: `Your feedback: "${feedback}"`,
          });
          console.log("Feedback submitted:", feedback);
        } else {
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to submit feedback at the moment.",
        });
      }
    } else if (feedback === "") {
      Swal.fire({
        icon: "error",
        title: "No Feedback Entered",
        text: "You cannot submit empty feedback.",
      });
    }
  };
  const castVote = async (option) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/cast-vote",
        {
          voteId,
          userId,
          userEmail,
          selectedOption: option,
          title: idea.title,
        }
      );

      if (response.status === 200) {
        setSelectedOption(option);
        setOtpModal(true);
        setTimer(120);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Vote Recorded",
          text: "Check your email for the OTP.",
        });
      }
    } catch (error) {
      console.error("Error casting vote:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to cast vote. Please try again.",
      });
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (otpInput) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/verify-vote",
        {
          otp: otpInput,
        }
      );

      if (response.status === 200) {
        checkvote();
        setOtpModal(false);
        setOtp("");
        setHasVoted(true);
        Swal.fire({
          icon: "success",
          title: "Vote Confirmed",
          text: "Your vote has been successfully casted!",
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
  };

  const handleAccept = async () => {
    // Confirm acceptance
    Swal.fire({
      title: "Confirm Acceptance",
      text: "Are you sure you want to accept?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        castVote("Yes");
      }
    });
  };

  const handleReject = async () => {
    // Confirm rejection
    Swal.fire({
      title: "Confirm Rejection",
      text: "Are you sure you want to reject?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        castVote("No");
      }
    });
  };

  // OTP Modal UI
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
          <button className="modal-button" onClick={() => handleVerifyOTP(otp)}>
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
  useEffect(() => {
    let countdown;
    if (otpModal && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [otpModal, timer]);

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <div className="card votedetails-card">
          <div className="card-header votedetails-header">
            <h3 className="votedetails-title">Vote Details</h3>
          </div>
          <div className="card-body">
            <div className="votedetails-info">
              <h4 className="votedetails-info-title">
                Vote Name: {idea.title}
              </h4>

              <p className="votedetails-info-text">
                <strong>Deadline:</strong>{" "}
                {new Date(idea.deadline).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>

              <p className="votedetails-info-text">
                <strong>Description:</strong> {idea.description}
              </p>
            </div>

            <div className="votedetails-feedback">
              <h5 className="votedetails-feedback-title">
                Provide Your Feedback:
              </h5>
              <button
                className="btn votedetails-btn-feedback"
                onClick={handleProvideFeedback}
              >
                Provide Feedback
              </button>
              {!hasVoted ? ( // Conditional rendering based on voting state
                <div className="d-flex justify-content-between">
                  <button
                    className="btn votedetails-btn-accept"
                    onClick={handleAccept}
                  >
                    Accept
                  </button>
                  <button
                    className="btn votedetails-btn-reject"
                    onClick={handleReject}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className="votedetails-info-text-2 mt-4">
                  <strong>You have voted:</strong> {castedVote == null ? selectedOption : castedVote.selectedOption}
                </p>
              )}
            </div>
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
