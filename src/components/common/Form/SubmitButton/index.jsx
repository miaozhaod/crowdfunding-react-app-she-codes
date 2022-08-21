import React from "react";
import "./SubmitButton.css";

export default function SubmitButton({
  children,
  variant,
  onClick,
  submitMessage,
  result,
}) {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className={`submit-button ${
          variant === "primary"
            ? "primary"
            : variant === "primary-dark"
            ? "primary-dark"
            : variant === "danger"
            ? "danger"
            : "secondary"
        }`}
      >
        {children}
      </button>
      <p
        className={`submit-message ${
          result === "success" ? "success" : "fail"
        }`}
      >
        {submitMessage}
      </p>
    </div>
  );
}
