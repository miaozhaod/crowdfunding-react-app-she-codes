import React from "react";
import Placeholder from "../../../../assets/img/placeholder.svg";
import "./Input.css";

export default function Input({
  variant,
  type,
  id,
  label,
  placeholder,
  src,
  alt,
  defaultValue,
  defaultChecked,
  onChange,
  onBlur,
}) {
  return (
    <>
      <div className="form-field">
        <label htmlFor={id} className="form-input-label">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            type={type}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${variant} === "single_underline" ? "single_underline" : "}`}
          />
        ) : type === "checkbox" ? (
          <div className="form-field-checkbox">
            <input
              type={type}
              id={id}
              defaultChecked={defaultChecked}
              onChange={onChange}
              onBlur={onBlur}
            />
            <label htmlFor={id}>{placeholder}</label>
          </div>
        ) : id === "image" ? (
          <>
            <div className="input-image-container">
              <img src={src ? src : Placeholder} alt={id} />
            </div>
            <input
              type={type}
              id={id}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className={`${variant} === "single_underline" ? "single_underline" : "}`}
            />
          </>
        ) : (
          <input
            type={type}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${variant} === "single_underline" ? "single_underline" : "}`}
          />
        )}
      </div>
    </>
  );
}
