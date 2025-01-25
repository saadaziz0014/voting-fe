import React, { useState, useEffect, use } from "react";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";

export default function UserIdeas() {
  // Dummy data for submitted ideas
  const [ideas, setIdeas] = useState([
    {
      title: "Reduce Carbon Emissions",
      description:
        "Implement sustainable energy strategies to cut emissions by 30%.",
      impacts: "Reduced pollution, sustainable growth.",
      dateSubmitted: "2024-12-10",
    },
    {
      title: "Affordable Housing Solutions",
      description: "Develop policies for affordable housing in urban areas.",
      impacts: "Improved living conditions, reduced homelessness.",
      dateSubmitted: "2024-12-05",
    },
    {
      title: "Enhance Recycling Programs",
      description:
        "Increase recycling rates by 50% through public awareness campaigns.",
      impacts: "Less landfill waste, more reusable materials.",
      dateSubmitted: "2024-12-15",
    },
    {
      title: "Community Education Initiatives",
      description:
        "Provide free workshops on financial literacy and skill-building.",
      impacts: "Empowered individuals, better job opportunities.",
      dateSubmitted: "2024-11-25",
    },
  ]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/suggested-ideas"
        );

        const myideas = response.data.filter((idea) => idea.userId === sessionStorage.getItem("userId"));
        setIdeas(myideas);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <div className="card yourideas-main-card">
          <div className="card-header yourideas-header">
            <h3 className="yourideas-title">Your Submitted Ideas</h3>
          </div>
          <div className="card-body yourideas-container">
            {ideas.map((idea, index) => (
              <div key={index} className="card yourideas-card mb-3">
                <div className="card-body">
                  <h5 className="yourideas-card-title">{idea.title}</h5>
                  <p className="yourideas-card-description">
                    {idea.description}
                  </p>
                  <p className="yourideas-card-impacts">
                    <strong>Impacts:</strong> {idea.outcomes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
