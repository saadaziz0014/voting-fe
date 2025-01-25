import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminViewIdeas() {
  // State to store fetched ideas
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);



  // Fetch ideas from the server
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/suggested-ideas"
        );
        setIdeas(response.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle "Accept" button click
  const handleAccept = (idea) => {
    alert(`Idea with ID ${idea._id} has been accepted.`);
    navigate(`/createvote`, { state: { idea } });





  };

  // Handle "Delete" button click
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/delete-idea`, {
        data: { id },
      });
      if (response.status === 200) {
        toast.success("Idea deleted successfully!", {
          position: "top-center",
          autoClose: 1000, // 2 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // Update the state to remove the deleted idea from the list
        setIdeas(ideas.filter((idea) => idea._id !== id));
      } else {
        toast.error("Error deleting idea!");
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
      toast.error("Error deleting idea!");
    }
  };


  return (
    <div className="container mt-5">
      <div className="card ideas-card">
        <div className="card-header text-center ideas-header">
          <h3 className="ideas-title">Submitted Ideas</h3>
        </div>
        <div className="card-body ideas-body-scroll">
          {/* Map over the ideas array to display each idea dynamically */}
          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <div key={idea._id} className="idea-item mb-3">
                <h5 className="idea-name">Idea: {idea.title}</h5>
                <p className="idea-description">
                  <strong>Submitted By:</strong> {idea.userEmail}
                </p>
                <p className="idea-description">
                  <strong>Description:</strong> {idea.description}
                </p>
                <p className="idea-impacts">
                  <strong>Impacts:</strong> {idea.outcomes}
                </p>
                <div className="button-group">
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleAccept(idea)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(idea._id)}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>No ideas submitted yet.</p>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
