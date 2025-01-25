import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function AdminVotingDetails() {
  const location = useLocation();
  const { idea } = location.state || {};
  const [feedbacks, setFeedbacks] = useState([]);
  const voteId = idea._id;
  const [voteCounts, setVoteCounts] = useState({});


  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Make the API call to fetch feedbacks based on Id
        const response = await axios.post("http://localhost:5000/api/admin/get-feedbacks", { voteId });

        // Handle the response
        if (response.status === 200) {
          console.log("Feedbacks fetched successfully:", response.data);
          setFeedbacks(response.data); // Update the feedbacks state
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        toast.error("Failed to fetch feedbacks. Please try again later.");
      }
    };

    if (voteId) {
      fetchFeedbacks(); // Fetch feedbacks if Id is available
    }
  }, [voteId]); // Re-run the effect whenever Id changes
  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/admin/get-vote-count", { voteId });

        if (response.status === 200) {
          setVoteCounts(response.data);
          console.log("Vote counts fetched successfully");
        } else {
          toast.error("Failed to fetch vote counts. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching vote counts:", err);
        toast.error("An error occurred while fetching vote counts.");
      }
    };

    if (voteId) {
      fetchVoteCounts();
    }
  }, [voteId]);
  useEffect(() => {
    console.log(voteCounts);

  }, [voteCounts]);



  // Dummy data for voting details
  const dummyVotingData = {
    name: "Proposal to Reduce Carbon Emissions",
    deadline: "2024-12-31",
    description:
      "This vote seeks to implement policies aimed at reducing carbon emissions by 30% within the next decade. The proposal includes strategies for sustainable energy, reduced industrial emissions, and public awareness campaigns.",
    currentResults: {
      yesVotes: 120,
      noVotes: 45,
    },
    feedback: [
      {
        user: "Jane Doe",
        comment:
          "This is a great initiative! We need more awareness and action.",
      },
      {
        user: "John Smith",
        comment:
          "I support this, but I think the timeline should be more realistic.",
      },
      {
        user: "Emily White",
        comment: "We need to consider the economic impact too.",
      },
      {
        user: "Michael Brown",
        comment: "Excellent proposal, let's make it happen!",
      },
      {
        user: "Sarah Wilson",
        comment: "What about rural areas? We need solutions for everyone.",
      },
    ],
  };


  // Set the state with the dummy voting data
  const [votingDetails, setVotingDetails] = useState(dummyVotingData);

  return (
    <>
      <AdminNav />
      <div className="container mt-5">
        {/* Main Card */}
        <div className="card admin-details-card">
          <div className="card-header admin-details-header">
            <h3 className="admin-details-title">Voting Details</h3>
          </div>
          <div className="card-body">
            {/* Voting Details */}
            <div className="mb-4">
              <h5 className="admin-details-subtitle">Name:</h5>
              <p className="admin-details-text">{idea.title}</p>
            </div>
            <div className="mb-4">
              <h5 className="admin-details-subtitle">Deadline:</h5>
              <p className="admin-details-text">{new Date(idea.deadline).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}</p>
            </div>
            <div className="mb-4">
              <h5 className="admin-details-subtitle">Description:</h5>
              <p className="admin-details-text">{idea.description}</p>
            </div>

            {/* Current Results */}
            <div className="mb-4">
              <h5 className="admin-details-subtitle">Current Results:</h5>
              <div>
                <span className="admin-results-label">In Favour:  </span>
                <span className="admin-results-value">
                  {voteCounts === null ? 0 : voteCounts.yesVotes} votes
                </span>
              </div>
              <div>
                <span className="admin-results-label">In Against: </span>
                <span className="admin-results-value">
                  {voteCounts === null ? 0 : voteCounts.noVotes} votes
                </span>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mb-4">
              <h5 className="admin-details-subtitle">User Feedback:</h5>
              <div className="admin-feedback-container">
                <ul className="list-group admin-feedback-list">
                  {feedbacks.map((feedback, index) => (
                    <li className="list-group-item" key={index}>
                      <strong>{feedback.userFirstName}:</strong> {feedback.feedback}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
