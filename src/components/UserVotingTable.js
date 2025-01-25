import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserVotingTable() {
  // Dummy data for votes
  const [ideas, setIdeas] = useState([]);

  // Fetch ideas from the server
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/ideas"
        );
        setIdeas(response.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, []);
  const navigate = useNavigate();

  // Handle the "View Details" button click
  const handleViewDetails = (idea) => {
    // Navigate to the details page with the vote name as a URL parameter
    navigate(`/uservotingdetails`, { state: { idea } });
  };

  return (
    <>
      <div className="col-lg-6">
        <div className="card twocards-card h-100">
          <div className="card-header twocards-header">
            <h4 className="twocards-title">Active Votes</h4>
          </div>
          <div className="card-body twocards-table-container">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ideas.map((vote, index) => (
                  <tr key={index}>
                    <td>{vote.title}</td>
                    <td>
                      {new Date(vote.deadline).toLocaleString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm twocards-btn"
                        onClick={() => handleViewDetails(vote)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
