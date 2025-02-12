import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import DashboardLayoutBasic from "./components/DashboardLayoutBasic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/*" element={<DashboardLayoutBasic />} />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
