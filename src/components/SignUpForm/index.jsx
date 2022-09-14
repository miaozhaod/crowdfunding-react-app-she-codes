import React, { useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import Input from "../common/Form/Input";
import SubmitButton from "../common/Form/SubmitButton";
import AuthPrompt from "../common/AuthPrompt";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const signUpFormInputFields = [
    {
      type: "text",
      id: "username",
      label: "Username",
      placeholder: "Enter your username ...",
    },
    {
      type: "email",
      id: "email",
      label: "Email",
      placeholder: "Enter your email ...",
    },
    {
      type: "password",
      id: "password",
      label: "Password",
      placeholder: "Enter your password ...",
    },
    {
      type: "textarea",
      id: "bio",
      label: "Bio",
      placeholder: "Tell us something about you ...",
    },
    {
      type: "text",
      id: "avatar",
      label: "Avatar",
      placeholder: "Put an image url ...",
    },
  ];

  const handleChange = event => {
    const { id, value } = event.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const postData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("sign up with credentials: ", credentials);

    if (
      credentials.username &&
      credentials.email &&
      credentials.password &&
      credentials.bio &&
      credentials.avatar
    ) {
      const data = await postData().catch(err => {
        console.log("signup err: ", err);
        setSubmitMessage("Username already exists, please enter another one");
        setSubmitResult("fail");
      });
      console.log("signup response data: ... ", data);
      if (data) {
        navigate("/login");
      }
    } else {
      setSubmitMessage("Please enter all fields");
      setSubmitResult("fail");
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        {signUpFormInputFields.map((field, index) => {
          const { type, id, label, placeholder } = field;
          return (
            <Input
              key={index}
              type={type}
              id={id}
              label={label}
              src={credentials.avatar}
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
          Sign up
        </SubmitButton>
      </form>
      <AuthPrompt
        text="Already have an account?"
        action="Login now"
        link="/login"
      />
    </div>
  );
}
