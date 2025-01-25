import React, { useState, useEffect } from "react";

export default function Calendar() {
  // Hardcoded dummy array with some specific voting deadlines
  const deadlines = [
    { name: "Vote A", deadline: new Date("2024-12-15") },
    { name: "Vote B", deadline: new Date("2024-12-16") }, // Multiple vote on the same day
    { name: "Vote C", deadline: new Date("2024-12-24") },
    { name: "Vote D", deadline: new Date("2024-12-19") },
    { name: "Vote E", deadline: new Date("2024-12-19") }, // Multiple vote on the same day
    { name: "Vote F", deadline: new Date("2024-12-20") },
    { name: "Vote G", deadline: new Date("2024-12-22") },
  ];

  const [currentWindow, setCurrentWindow] = useState([]);

  useEffect(() => {
    const today = new Date();
    let next7Days = [];

    // Generate the next 7 days and check if there's a vote deadline
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i); // Get the next 7 days

      // Get all deadlines for the current day
      const dayDeadlines = deadlines.filter((d) => {
        return (
          d.deadline.getDate() === currentDay.getDate() &&
          d.deadline.getMonth() === currentDay.getMonth() &&
          d.deadline.getFullYear() === currentDay.getFullYear()
        );
      });

      next7Days.push({
        deadlines: dayDeadlines, // Store all deadlines for this day
        deadline: currentDay,
      });
    }

    setCurrentWindow(next7Days);
  }, []);

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card usercalendar-card">
          <div className="card-header usercalendar-header text-center">
            <h3 className="usercalendar-title">Voting Deadlines Calendar</h3>
          </div>
          <div className="card-body">
            <div className="calendar-container">
              <div className="calendar-grid">
                {currentWindow.map((item, index) => {
                  const date = item.deadline.getDate();
                  const month = item.deadline.toLocaleString("default", {
                    month: "short",
                  });
                  return (
                    <div
                      key={index}
                      className={`day ${
                        item.deadlines.length > 0 ? "marked" : ""
                      }`}
                    >
                      <span className="date">
                        {month} {date}
                      </span>
                      {item.deadlines.length > 0 && (
                        <div className="vote-names">
                          {item.deadlines.map((vote, i) => (
                            <span key={i} className="vote-name">
                              {vote.name + " "}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
