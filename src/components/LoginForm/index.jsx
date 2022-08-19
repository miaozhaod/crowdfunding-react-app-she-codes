import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import Input from "../common/Form/Input";
import SubmitButton from "../common/Form/SubmitButton";

export default function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");

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

  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api-token-auth/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Loggin in with credentials: ", credentials);

    if (credentials.username && credentials.password) {
      const data = await postData();
      console.log("login response data: ... ", data);
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        const { non_field_errors } = data;
        setSubmitMessage(non_field_errors[0]);
        setSubmitResult("fail");
      }
    }
  };

  return (
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
  );
}
