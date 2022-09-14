import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import Input from "../common/Form/Input";
import SubmitButton from "../common/Form/SubmitButton";
import AuthPrompt from "../common/AuthPrompt";
import { login } from "../../services/auth/login";

export default function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const fromProjectID = window.localStorage.getItem("fromProjectId");

  const loginFormInputFields = [
    {
      type: "text",
      id: "username",
      label: "Username",
      placeholder: "Enter your username ...",
    },
    {
      type: "password",
      id: "password",
      label: "Password",
      placeholder: "Enter your password ...",
    },
  ];

  const handleChange = event => {
    const { id, value } = event.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Loggin in with credentials: ", credentials);

    if (credentials.username && credentials.password) {
      login(credentials).then(data => {
        console.log("login response data: ... ", data);
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("user_id", data.id);
          window.localStorage.setItem("login", true);
          fromProjectID ? navigate(`/project/${fromProjectID}`) : navigate("/");
          window.location.reload();
        } else {
          const { non_field_errors } = data;
          setSubmitMessage(non_field_errors[0]);
          setSubmitResult("fail");
        }
      });
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        {loginFormInputFields.map((field, index) => {
          const { type, id, label, placeholder } = field;
          return (
            <Input
              key={index}
              type={type}
              id={id}
              label={label}
              placeholder={placeholder}
              onChange={handleChange}
            />
          );
        })}
        <SubmitButton
          variant="primary"
          submitMessage={submitMessage}
          result={submitResult}
        >
          Login
        </SubmitButton>
      </form>
      <AuthPrompt
        text="Don't have an account?"
        action="Sign up now"
        link="/sign-up"
      />
    </div>
  );
}
