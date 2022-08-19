import React from "react";
import "./Input.css";

export default function Input({ type, id, label, placeholder, onChange }) {
  return (
    <>
      <div className="form-field">
        <label htmlFor={id}>{label}</label>
        {type === "textarea" ? (
          <textarea
            type={type}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </div>
    </>
  );
}
