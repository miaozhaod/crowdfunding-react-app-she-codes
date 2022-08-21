import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Form/Input";
import SubmitButton from "../common/Form/SubmitButton";
import { createPledgeFormInputFields } from "./constants";

export default function CreatePledgeForm({ project_id }) {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
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
  const postData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/pledges/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pledgeDetails),
    });
    return response.json();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Create pledge with pledgeDetails: ", pledgeDetails);
    if (pledgeDetails.amount && pledgeDetails.comment) {
      const data = await postData();
      console.log("Create pledge response data: ... ", data);
      setSubmitMessage(
        "Yah! Pledge created successfully, we're directing you to the poject page ..."
      );
      setSubmitResult("success");
      navigate(`/project/${project_id}`);
    } else {
      setSubmitMessage("Please enter all fields");
      setSubmitResult("fail");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-project-form">
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
  );
}
