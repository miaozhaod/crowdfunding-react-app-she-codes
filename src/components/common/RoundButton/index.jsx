import React from "react";
import "./RoundButton.css";

export default function RoundButton({ children, variant }) {
  return (
    <button className={`${variant === "primary" ? "primary" : "secondary"}`}>
      {children}
    </button>
  );
}
