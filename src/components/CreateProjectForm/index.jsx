import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Form/Input";
import SubmitButton from "../common/Form/SubmitButton";

export default function LoginForm() {
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({
    title: "Another Test Project",
    description: "This is a test project",
    location: "Brisbane",
    goal: 1000,
    image:
      "https://images.unsplash.com/photo-1660516323476-99e31f09c544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    date_due: "2022-09-20T14:28:23.382748Z",
    is_open: true,
    date_created: new Date(),
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const token = window.localStorage.getItem("token");
  const createProjectFormInputFields = [
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
      type: "number",
      id: "goal",
      label: "Goal",
      placeholder: "What's your crowdfunding goal ...",
    },
    {
      type: "date",
      id: "date_due",
      label: "Due date",
      placeholder: "Enter a due date ...",
    },
    {
      type: "text",
      id: "image",
      label: "Image",
      placeholder: "Upload an image ...",
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
      {createProjectFormInputFields.map((field, index) => {
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
