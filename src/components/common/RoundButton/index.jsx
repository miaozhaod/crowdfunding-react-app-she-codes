import React from "react";
import "./RoundButton.css";

export default function RoundButton({ children, variant, onClick }) {
  return (
    <button
      className={`round-button ${
        variant === "primary" ? "primary" : "secondary"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
