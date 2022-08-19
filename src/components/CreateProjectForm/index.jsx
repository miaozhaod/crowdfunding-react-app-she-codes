import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Form/Input";
import SubmitButton from "../common/Form/SubmitButton";

export default function LoginForm() {
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({
    title: "Test Project",
    description: "This is a test project",
    location: "Brisbane",
    goal: 1000,
    image:
      "https://images.unsplash.com/photo-1660516323476-99e31f09c544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    date_due: "2022-09-20T14:28:23.382748Z",
    is_open: true,
    date_created: "2022-06-20T14:28:23.382748Z",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const token = window.localStorage.getItem("token");
  const loginFormInputFields = [
    {
      type: "text",
      id: "title",
      label: "Title",
      placeholder: "Give your exhibition a title ...",
    },
    {
      type: "textarea",
      id: "description",
      label: "Description",
      placeholder: "Describe your exhibition ...",
    },
    {
      type: "text",
      id: "location",
      label: "Location",
      placeholder: "Where are you planning to open your exhibition ...",
    },
    {
      type: "number",
      id: "goal",
      label: "Goal",
      placeholder: "What's your crowdfunding goal ...",
    },
    {
      type: "text",
      id: "image",
      label: "Image",
      placeholder: "Upload an image ...",
    },
    {
      type: "text",
      id: "date_due",
      label: "Due date",
      placeholder: "Enter a due date ...",
    },
    {
      type: "text",
      id: "is_open",
      label: "Status",
      placeholder: "Enter a due date ...",
    },
    {
      type: "text",
      id: "date_created",
      label: "Created Date",
      placeholder: "Enter a created date ...",
    },
  ];

  const handleChange = event => {
    const { id, value } = event.target;
    let passValue;
    id === "goal" ? (passValue = parseInt(value)) : (passValue = value);
    setProjectDetails({ ...projectDetails, [id]: passValue });
    console.log("setProjectDetails: ", projectDetails);
  };

  const postData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDetails),
    });
    return response.json();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Create project with projectDetails: ", projectDetails);

    const data = await postData();
    console.log("Create project response data: ... ", data);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Create Now !
      </SubmitButton>
    </form>
  );
}
