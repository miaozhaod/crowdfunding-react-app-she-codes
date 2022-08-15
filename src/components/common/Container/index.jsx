import React from "react";
import "./Container.css";

export default function Container({ children, bg, variant }) {
  return (
    <div className={`container ${bg ? "bg" : ""}`}>
      <div
        className={`wrapper ${
          variant === "nav"
            ? "nav"
            : variant === "footer"
            ? "footer"
            : variant === "banner"
            ? "banner"
            : "section"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
