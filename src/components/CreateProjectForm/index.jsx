import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Form/Input";
import LabelSelector from "../common/Form/LabelSelector";
import SubmitButton from "../common/Form/SubmitButton";
import {
  createProjectFormInputFields,
  initialLocationStates,
} from "./constants";
import { createProject } from "../../services/createProject";
import "./CreateProjectForm.css";

export default function CreateProjectForm() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    location: "",
    goal: "",
    image: "",
    date_due: "",
    is_open: true,
    date_created: new Date(),
  });

  const [locationLabels, setLocationLabels] = useState(initialLocationStates);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const handleChange = event => {
    const { id, value } = event.target;

    let passValue;
    id === "goal" ? (passValue = parseInt(value)) : (passValue = value);
    setProjectDetails({ ...projectDetails, [id]: passValue });
  };

  const handleClick = index => {
    setProjectDetails({
      ...projectDetails,
      location: Object.keys(initialLocationStates[index]).toString(),
    });
    const newLocationStates = [...initialLocationStates];
    newLocationStates[index] = {
      [Object.keys(newLocationStates[index])]: true,
    };
    setLocationLabels(newLocationStates);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Create project with projectDetails: ", projectDetails);
    if (
      projectDetails.title &&
      projectDetails.description &&
      projectDetails.location &&
      projectDetails.goal &&
      projectDetails.image &&
      projectDetails.date_due
    ) {
      createProject(token, projectDetails).then(data => {
        const { id } = data;
        console.log("Create project response data: ... ", data);
        setSubmitMessage(
          "Yah! Project created successfully, we're directing you to your poject page ..."
        );
        setSubmitResult("success");
        navigate(`/project/${id}`);
      });
    } else {
      setSubmitMessage("Please enter all fields");
      setSubmitResult("fail");
    }
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
            src={projectDetails.image}
          />
        );
      })}
      <div className="location-selectors-field">
        <label>Location</label>
        <div className="location-selectors-options">
          {locationLabels.map((location, index) => {
            return (
              <LabelSelector
                key={index}
                onClick={() => handleClick(index)}
                labelState={Object.values(location)}
              >
                {Object.keys(location)}
              </LabelSelector>
            );
          })}
        </div>
      </div>

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
