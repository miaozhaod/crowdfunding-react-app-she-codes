import React from "react";
import "./Banner.css";

export default function Banner({ heading, children }) {
  return (
    <div className="banner">
      <h1> {heading}</h1>
      {children}
    </div>
  );
}
