import React from "react";
import "./SubmitButton.css";

export default function SubmitButton({
  children,
  variant,
  submitMessage,
  result,
}) {
  return (
    <div>
      <button
        type="submit"
        className={`submit-button ${
          variant === "primary" ? "primary" : "secondary"
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
