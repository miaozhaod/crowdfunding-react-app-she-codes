import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/common/Nav";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import CreatePledgePage from "./pages/CreatePledgePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EditProfilePage from "./pages/EditProfilePage";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Router>
      <div id="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/create-pledge/:id" element={<CreatePledgePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/edit-profile/:id" element={<EditProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
