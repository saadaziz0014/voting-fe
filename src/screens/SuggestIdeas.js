import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";

export default function SuggestIdeas() {
  const [ideaName, setIdeaName] = useState("");
  const [description, setDescription] = useState("");
  const [impacts, setImpacts] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!ideaName || !description || !impacts) {
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 2000, // 2 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        // Fetch user details from local storage
        const userId = sessionStorage.getItem("userId");
        const userEmail = sessionStorage.getItem("userEmail");
        const userFirstName = sessionStorage.getItem("userFirstName");

        // Prepare the data to be sent to the database
        const ideaData = {
          title: ideaName,
          description,
          outcomes: impacts,
          userEmail,
          userFirstName,
          userId,
        };

        // Make API call to store the data
        const response = await axios.post("http://localhost:5000/api/users/idea-suggestion", ideaData);

        // If the API call is successful
        if (response.status === 200) {
          toast.success("Idea submitted successfully!", {
            position: "top-center",
            autoClose: 2000, // 2 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          console.log("Idea Submitted:", ideaData);

          // Reset the form fields
          setIdeaName("");
          setDescription("");
          setImpacts("");
          setTimeout(() => navigate("/userdashboard"), 1500); // Navigate after showing success toast
        }
      } catch (error) {
        console.error("Error submitting idea:", error);

        // Show error toast if submission fails
        toast.error("Failed to submit idea. Please try again later.", {
          position: "top-center",
          autoClose: 2000, // 2 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <UserNavbar></UserNavbar>
      <div className="container mt-5">
        <div className="card suggestidea-card">
          <div className="card-header text-center suggestidea-header">
            <h3 className="suggestidea-title">Suggest an Idea</h3>
          </div>
          <div className="card-body">
            {/* Name */}
            <div className="mb-3">
              <label
                htmlFor="idea-name"
                className="form-label suggestidea-label"
              >
                Idea Name
              </label>
              <input
                type="text"
                className="form-control suggestidea-input"
                id="idea-name"
                placeholder="Enter the idea name"
                value={ideaName}
                onChange={(e) => setIdeaName(e.target.value)}
                required
              />
            </div>
            {/* Description */}
            <div className="mb-3">
              <label
                htmlFor="idea-description"
                className="form-label suggestidea-label"
              >
                Description
              </label>
              <textarea
                className="form-control suggestidea-textarea"
                id="idea-description"
                rows="4"
                placeholder="Describe your idea and its purpose"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            {/* Impacts */}
            <div className="mb-3">
              <label
                htmlFor="idea-impacts"
                className="form-label suggestidea-label"
              >
                Impacts
              </label>
              <textarea
                className="form-control suggestidea-textarea"
                id="idea-impacts"
                rows="3"
                placeholder="Outline the expected impacts of your idea"
                value={impacts}
                onChange={(e) => setImpacts(e.target.value)}
                required
              ></textarea>
            </div>
            {/* Submit Button */}
            <div className="d-grid mt-4">
              <button
                className="btn suggestidea-btn-submit"
                onClick={handleSubmit}
              >
                Submit Idea
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
