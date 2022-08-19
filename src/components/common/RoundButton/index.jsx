import React from "react";
import "./RoundButton.css";

export default function RoundButton({ children, variant }) {
  return (
    <button
      className={`round-button ${
        variant === "primary" ? "primary" : "secondary"
      }`}
    >
      {children}
    </button>
  );
}
