import React from "react";
import { Link } from "react-router-dom";
import "./AuthPrompt.css";

export default function AuthPrompt({ text, action, link }) {
  return (
    <div className="auth-prompt">
      <p>{text}</p>
      <Link to={link}>{action}</Link>
    </div>
  );
}
