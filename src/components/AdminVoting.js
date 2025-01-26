import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminVoting() {
  const navigate = useNavigate();

  // State for storing ideas
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

  // Handle view details button click
  const handleViewDetails = (idea) => {
    navigate(`/voting/adminvotingdetails`, { state: { idea } });
  };

  // Handle delete button click
  const handleDelete = (id) => {
    alert(`Idea with ID ${id} has been deleted.`);
    // Filter out the deleted idea from the state
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
  };

  return (
    <div className="col-lg-6">
      <div className="card admin-card h-100">
        <div className="card-header admin-header">
          <h4 className="admin-title">Active Votes</h4>
        </div>
        <div className="card-body admin-table-container">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="custom-blue">Name</th>
                <th className="custom-blue">Date</th>
                <th className="custom-blue">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamically populate the table rows */}
              {ideas.map((idea) => (
                <tr key={idea.id}>
                  <td>{idea.title}</td>
                  <td>
                    {new Date(idea.deadline).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </td>
                  <td className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-sm admin-btn me-2"
                      onClick={() => handleViewDetails(idea)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-sm text-danger"
                      onClick={() => handleDelete(idea.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
