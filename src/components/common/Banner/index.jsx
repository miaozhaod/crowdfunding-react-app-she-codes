import React from "react";
import "./Banner.css";

export default function Banner({ heading, variant, children }) {
  return (
    <div className="banner">
      <h1> {heading}</h1>
      <div className={`${variant === "banner-tags" ? "banner-tags" : ""}`}>
        {children}
      </div>
    </div>
  );
}
