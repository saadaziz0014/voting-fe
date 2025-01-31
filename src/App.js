import "./App.css";
import AdminDashboard from "./screens/AdminDashboard";
import AdminLogin from "./screens/AdminLogin";
import AdminLogs from "./screens/AdminLogs";
import AdminVotingDetails from "./screens/AdminVotingDetails";
import CreateVote from "./screens/CreateVote";
import Settings from "./screens/Settings";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import SuggestIdeas from "./screens/SuggestIdeas";
import UserDashboard from "./screens/UserDashboard";
import UserVoteDetails from "./screens/UserVoteDetails";
import "./styling/admin_login.css";
import "./styling/admincards.css";
import "./styling/ideas.css";
import "./styling/adminnav.css";
import "./styling/adminvotingdetails.css";
import "./styling/ideaform.css";
import "./styling/logs.css";
import "./styling/settings.css";
import "./styling/signin.css";
import "./styling/signup.css";
import "./styling/submittedideas.css";
import "./styling/suggestidea.css";
import "./styling/twocards.css";
import "./styling/usercalendar.css";
import "./styling/usernav.css";
import "./styling/votedetails.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserIdeas from "./screens/UserIdeas";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp></SignUp>} />
          <Route path="/login" element={<SignIn></SignIn>} />
          <Route
            path="/userdashboard"
            element={<UserDashboard></UserDashboard>}
          />
          <Route path="/uservotingdetails" element={<UserVoteDetails />} />
          <Route path="/ideasubmit" element={<SuggestIdeas />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/adminlog" element={<AdminLogs></AdminLogs>} />
          <Route path="/createvote" element={<CreateVote />} />
          <Route path="/userideas" element={<UserIdeas />} />
          <Route
            path="/adminvotingdetails"
            element={<AdminVotingDetails></AdminVotingDetails>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
