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
          <Route path="/voting/uservotingdetails" element={<UserVoteDetails />} />
          <Route path="/voting/ideasubmit" element={<SuggestIdeas />} />
          <Route path="/voting/settings" element={<Settings />} />
          <Route path="/voting/adminlogin" element={<AdminLogin />} />
          <Route path="/voting/admindashboard" element={<AdminDashboard />} />
          <Route path="/voting/adminlog" element={<AdminLogs></AdminLogs>} />
          <Route path="/voting/createvote" element={<CreateVote />} />
          <Route path="/voting/userideas" element={<UserIdeas />} />
          <Route
            path="/voting/adminvotingdetails"
            element={<AdminVotingDetails></AdminVotingDetails>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
