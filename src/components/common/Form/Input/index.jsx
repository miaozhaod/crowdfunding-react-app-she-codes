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
        ) : type === "checkbox" ? (
          <div className="form-field-checkbox">
            <input type={type} id={id} onChange={onChange} />
            <label htmlFor={id}>{placeholder}</label>
          </div>
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
