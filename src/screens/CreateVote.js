import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function CreateVote() {
  // State for the form inputs
  const location = useLocation();
  const { idea } = location.state || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  // Initialize state with the idea data
  useEffect(() => {
    if (idea) {
      setTitle(idea.title);
      setDescription(idea.description);
      setOutcomes(idea.outcomes);
    }
  }, [idea]);


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the server
    const voteData = {
      title,
      description,
      outcomes,
      deadlineDate,
      deadlineTime,
    };

    try {
      // Send a POST request to the server to create the vote
      const response = await axios.post("http://localhost:5000/api/admin/create-vote", voteData);

      // Show a success message (or handle response as needed)
      alert(`Vote created successfully: ${response.data.message}`);

      // Optionally reset form after submission
      setTitle("");
      setDescription("");
      setOutcomes("");
      setDeadlineDate("");
      setDeadlineTime("");
    } catch (error) {
      console.error('Error creating vote:', error);
      alert('Failed to create vote');
    }
  };

  return (
    <>
      <AdminNav></AdminNav>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card ideaform-card">
          <div className="p-4">
            <h3 className="ideaform-title text-center">Propose an Idea</h3>
            <p className="ideaform-subtitle text-center">
              Share your ideas and make a difference.
            </p>
            <form className="ideaform-form" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label
                  htmlFor="ideaform-title"
                  className="form-label ideaform-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control ideaform-input"
                  id="ideaform-title"
                  placeholder="Enter a brief, descriptive title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* Description */}
              <div className="mb-3">
                <label
                  htmlFor="ideaform-description"
                  className="form-label ideaform-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control ideaform-input"
                  id="ideaform-description"
                  rows="4"
                  placeholder="Provide detailed information about your idea and its benefits"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              {/* Expected Outcomes */}
              <div className="mb-3">
                <label
                  htmlFor="ideaform-outcomes"
                  className="form-label ideaform-label"
                >
                  Expected Outcomes
                </label>
                <textarea
                  className="form-control ideaform-input"
                  id="ideaform-outcomes"
                  rows="3"
                  placeholder="Outline the potential impacts or improvements"
                  required
                  value={outcomes}
                  onChange={(e) => setOutcomes(e.target.value)}
                ></textarea>
              </div>
              {/* Deadline */}
              <div className="mb-3">
                <label
                  htmlFor="ideaform-deadline"
                  className="form-label ideaform-label"
                >
                  Deadline for Voting
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="date"
                    className="form-control ideaform-input"
                    id="ideaform-deadline-date"
                    required
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className="form-control ideaform-input"
                    id="ideaform-deadline-time"
                    required
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                  />
                </div>
              </div>
              {/* Submit Button */}
              <button type="submit" className="btn ideaform-btn w-100">
                Submit Proposal
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
