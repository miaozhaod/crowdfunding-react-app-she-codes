import React from "react";
import "./LabelSelector.css";

export default function LabelSelector({ children, onClick, labelState }) {
  return (
    <label
      className={`label-selector ${
        labelState[0] ? "selected" : "non-selected"
      }`}
      onClick={onClick}
    >
      {children}
    </label>
  );
}
