import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubmitButton from "../common/Form/SubmitButton";
import "./UpdateProjectForm.css";
import { getProjectById } from "../../services/getProjectById";
import { updateProjectById } from "../../services/updateProjectById";

export default function UpdateProjectForm() {
  const { id } = useParams();
  const token = window.localStorage.getItem("token");

  const [projectDetails, setProjectDetails] = useState();
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  useEffect(() => {
    getProjectById(id).then(data => {
      setProjectDetails(data);
    });
  }, [id]);

  const handleBlur = event => {
    const { id, value } = event.target;
    console.log("value:", value);
    let passValue;
    id === "goal" ? (passValue = parseInt(value)) : (passValue = value);
    setProjectDetails({ ...projectDetails, [id]: passValue });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Update project with projectDetails: ", projectDetails);
    if (
      projectDetails.title &&
      projectDetails.description &&
      projectDetails.location &&
      projectDetails.goal &&
      projectDetails.image &&
      projectDetails.date_due
    ) {
      updateProjectById(id, token, projectDetails).then(data => {
        console.log("Update project response data: ... ", data);
        setSubmitMessage("Yah! Project update successfully!");
        setSubmitResult("success");
      });
    } else {
      setSubmitMessage("Please enter all fields");
      setSubmitResult("fail");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-project-form">
      {projectDetails && (
        <>
          <input
            type="text"
            id="title"
            defaultValue={projectDetails.title}
            onBlur={handleBlur}
          />
          <input
            type="text"
            id="decription"
            defaultValue={projectDetails.description}
            onBlur={handleBlur}
          />
          <input
            type="text"
            id="image"
            defaultValue={projectDetails.image}
            onBlur={handleBlur}
          />
          <input
            type="number"
            id="goal"
            defaultValue={projectDetails.goal}
            onBlur={handleBlur}
          />
          <input
            type="checkbox"
            id="is_open"
            defaultChecked={projectDetails.is_open}
            onBlur={handleBlur}
          />
          <input
            type="date"
            id="date_due"
            defaultValue={
              new Date(projectDetails.date_due).toISOString().split("T")[0]
            }
            onBlur={handleBlur}
          />
        </>
      )}

      <SubmitButton
        variant="primary"
        submitMessage={submitMessage}
        result={submitResult}
      >
        Update Now !
      </SubmitButton>
    </form>
  );
}
