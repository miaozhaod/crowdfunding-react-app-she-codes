import React from "react";
import "./Container.css";

export default function Container({ children, variant }) {
  return (
    <div className="container">
      <div
        className={`wrapper ${
          variant === "nav"
            ? "nav"
            : variant === "section"
            ? "section"
            : "footer"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
