import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import axios from "axios";


export default function AdminLogs() {
  // Dummy array with log data
  const dummyLogs = [
    { timestamp: "2024-12-15 10:00 AM", activity: "Login", userFirstName: "John Doe" },
    {
      timestamp: "2024-12-14 02:30 PM",
      activity: "Submitted Proposal",
      userFirstName: "Jane Smith",
    },
    { timestamp: "2024-12-13 11:45 AM", activity: "Voted", userFirstName: "Mark Lee" },
    {
      timestamp: "2024-12-12 09:15 AM",
      activity: "Password Change",
      userFirstName: "John Doe",
    },
  ];

  // Set the state with the dummy logs
  const [logs, setLogs] = useState(dummyLogs);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/admin/get-logs");

        if (response.status === 200) {
          setLogs(response.data);
          console.log("Logs fetched successfully:", response.data);
        } else {
          console.error("Failed to fetch logs.");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []); // Empty dependency array ensures this runs only once on component mount


  return (
    <>
      <AdminNav />
      <div className="container mt-5">
        {/* Logs Section */}
        <div className="logs-card card shadow-sm">
          <div className="card-header logs-card-header">
            <h5 className="logs-title">Activity Logs</h5>
          </div>
          <div className="card-body logs-card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="logs-table-header">
                  <tr>
                    <th className="custom-blue" scope="col">
                      Timestamp
                    </th>
                    <th className="custom-blue" scope="col">
                      Activity
                    </th>
                    <th className="custom-blue" scope="col">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through logs and display each log */}
                  {logs.map((log, index) => (
                    <tr key={index}>
                      <td>{new Date(log.timestamp).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}</td>
                      <td>{log.activity}</td>
                      <td>{log.userFirstName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
