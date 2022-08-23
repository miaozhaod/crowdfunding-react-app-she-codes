import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubmitButton from "../common/Form/SubmitButton";
import "./UpdateProjectForm.css";
import { getProjectById } from "../../services/getProjectById";
import { updateProjectById } from "../../services/updateProjectById";
import Input from "../common/Form/Input";

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
    const { id } = event.target;
    let passValue;
    id === "goal"
      ? (passValue = parseInt(event.target.value))
      : id === "is_open"
      ? (passValue = event.target.checked)
      : (passValue = event.target.value);
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
        if (
          data.detail &&
          data.detail === "You do not have permission to perform this action."
        ) {
          setSubmitMessage("You do not have permission to update this project");
          setSubmitResult("fail");
        } else {
          setSubmitMessage("Yah! Project update successfully!");
          setSubmitResult("success");
        }
      });
    } else {
      setSubmitMessage("Please enter all fields");
      setSubmitResult("fail");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {projectDetails && (
        <>
          <Input
            variant="single_underline"
            type="text"
            id="title"
            label="Title"
            defaultValue={projectDetails.title}
            onBlur={handleBlur}
          />
          <Input
            variant="single_underline"
            type="textarea"
            id="description"
            label="Description"
            defaultValue={projectDetails.description}
            onBlur={handleBlur}
          />
          <Input
            variant="single_underline"
            type="text"
            id="image"
            label="Image"
            defaultValue={projectDetails.image}
            onBlur={handleBlur}
            src={projectDetails.image}
          />
          <Input
            variant="single_underline"
            type="number"
            id="goal"
            label="Goal"
            defaultValue={projectDetails.goal}
            onBlur={handleBlur}
          />
          <Input
            variant="single_underline"
            type="checkbox"
            id="is_open"
            label="Project Status"
            placeholder="Untick the box to close the project / Tick the box to open the project"
            defaultChecked={projectDetails.is_open}
            onBlur={handleBlur}
          />
          <Input
            variant="single_underline"
            type="date"
            id="date_due"
            label="Due Date"
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
