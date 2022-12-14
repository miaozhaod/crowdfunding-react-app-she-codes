import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "components/common/Form/Input";
import SubmitButton from "components/common/Form/SubmitButton";
import { createPledgeFormInputFields } from "./constants";
import { createPledge } from "services/createPledge";

export default function CreatePledgeForm({ project_id }) {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const loginStatus = window.localStorage.getItem("login");
  const [pledgeDetails, setPledgeDetails] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    project_id,
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const handleChange = event => {
    const { id } = event.target;

    let passValue;
    id === "amount"
      ? (passValue = parseInt(event.target.value))
      : id === "anonymous"
      ? (passValue = event.target.checked)
      : (passValue = event.target.value);
    setPledgeDetails({ ...pledgeDetails, [id]: passValue });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Create pledge with pledgeDetails: ", pledgeDetails);
    if (pledgeDetails.amount && pledgeDetails.comment) {
      createPledge(token, pledgeDetails).then(data => {
        console.log("Create pledge response data: ... ", data);
        setSubmitMessage(
          "Yah! Pledge created successfully, we're directing you to the poject page ..."
        );
        setSubmitResult("success");
        navigate(`/project/${project_id}`);
      });
    } else {
      setSubmitMessage("Please enter all fields");
      setSubmitResult("fail");
    }
  };

  return loginStatus ? (
    <form onSubmit={handleSubmit}>
      {createPledgeFormInputFields.map((field, index) => {
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
        Pledge Now !
      </SubmitButton>
    </form>
  ) : (
    <Link to={`/login`}>
      <SubmitButton
        variant="primary-dark"
        onClick={() => {
          window.localStorage.setItem("fromProjectId", project_id);
        }}
      >
        Log in first to make a pledge!
      </SubmitButton>
    </Link>
  );
}
