import React, { useState } from "react";
import Calendar from "react-calendar";
import Swal from "sweetalert2";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import axios from "axios";

export default function CustomCalendar() {
  const [value, setValue] = useState(new Date());
  const [ideas, setIdeas] = useState([]);
  const [deadlines, setDeadlines] = useState({
    "2024-12-18": ["Project Deadline"],
    "2024-12-20": ["Submit Report", "Team Meeting"],
  });
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/admin/ideas");
        const fetchedIdeas = response.data; // Directly use the fetched data
        setIdeas(fetchedIdeas);

        // Transform the fetched data into the deadlines format with date, time (HH:mm), and title
        const updatedDeadlines = fetchedIdeas.reduce((acc, idea) => {
          const [date, time] = idea.deadline.split("T"); // Split into date and time
          const formattedTime = time.split("Z")[0].slice(0, 5); // Extract only HH:mm format

          if (!acc[date]) {
            acc[date] = [];
          }

          acc[date].push({ title: idea.title, time: formattedTime }); // Add the title and formatted time
          return acc;
        }, {});

        setDeadlines(updatedDeadlines);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleDayClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (deadlines[formattedDate]) {
      Swal.fire({
        title: "Deadlines", html: `<ul style="list-style-type: none; padding: 0;">${deadlines[formattedDate]
          .map(
            (deadline) =>
              `<li><strong>${deadline.title}</strong> - at: ${deadline.time}</li>`
          )
          .join("")}</ul>`,
        icon: "info",
        confirmButtonText: "Close",
      });
    } else {
      Swal.fire({
        title: "No Deadlines",
        text: "There are no deadlines for this date.",
        icon: "warning",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        value={value}
        onChange={setValue}
        tileContent={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          return deadlines[formattedDate] ? <div className="dot"></div> : null;
        }}
        onClickDay={handleDayClick}
      />

      <style>
        {`
          .dot {
            height: 5px;
            width: 5px;
            background-color: lightgreen;
            border-radius: 50%;
            margin: auto;
          }
        `}
      </style>
    </div>
  );
}
