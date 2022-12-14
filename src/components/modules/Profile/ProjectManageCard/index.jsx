import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "components/common/Form/SubmitButton";
import { getProjectById } from "services/getProjectById";
import { useImageErrorCard } from "services/useImageErrorCard";
import { deleteProjectById } from "services/deleteProjectById";
import "./style.css";

export default function ProjectCard({ project }) {
  const { id, image, location, title } = project;
  const token = window.localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [pledgeStatus, setPledgeStatus] = useState("");

  useEffect(() => {
    getProjectById(id).then(data => {
      const { goal, pledges } = data;
      let pledgeNumberArr = [];
      if (pledges.length > 0) {
        pledges.map(pledge => pledgeNumberArr.push(pledge.amount));
      } else {
        pledgeNumberArr.push(0);
      }
      const pledgeSum = pledgeNumberArr.reduce((accumulator, value) => {
        return accumulator + value;
      });
      setPledgeStatus(((pledgeSum / goal) * 100).toFixed(0));
    });
  }, [id]);

  const handleDeleteClick = () => {
    console.log("Delete project with id: ", id);
    deleteProjectById(id, token);
    window.location.reload();
  };

  return (
    <>
      <div className="project-card-container">
        <div className="project-image-div">
          <img src={image} alt={title} onError={useImageErrorCard} />
        </div>
        <div className="project-title-n-pledge">
          <div>
            <h4>{title}</h4>
            <p>{location ? location : "Loading..."}</p>
          </div>
          <div className="pledge-bar-base">
            <p className="pledge-bar-percentage-number">{pledgeStatus}%</p>
            <div
              className="pledge-bar-percentage-bar"
              style={{ width: `${pledgeStatus}%` }}
            ></div>
          </div>
        </div>
        <div>
          <SubmitButton variant="danger" onClick={() => setModal(true)}>
            Delete Project
          </SubmitButton>
          <Link to={`/update-project/${id}`}>
            <SubmitButton variant="primary">Update Project</SubmitButton>
          </Link>
        </div>
      </div>
      <div
        className={`delete-confirm-modal ${
          modal ? "modal-display" : "modal-hidden"
        }`}
      >
        <p>
          Do you confirm to delete this project? Once it is deleted, you cannot
          recover it
        </p>
        <div className="delete-confirm-modal-button-group">
          <SubmitButton onClick={() => setModal(false)}>
            No, not now
          </SubmitButton>
          <SubmitButton variant="primary" onClick={handleDeleteClick}>
            Yes, delete now
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
