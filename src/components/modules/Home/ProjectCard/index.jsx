import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "services/getUserById";
import { useImageErrorCard } from "services/useImageErrorCard";
import { getProjectById } from "services/getProjectById";
import "./style.css";

export default function ProjectCard({ project }) {
  const { id, image, location, owner, title } = project;
  const [ownerName, setOwnerName] = useState("");
  const [pledgeStatus, setPledgeStatus] = useState("");

  useEffect(() => {
    getUserById(owner).then(data => {
      setOwnerName(data.username);
    });
  }, [owner]);

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

  return (
    <div className="project-card-container">
      <Link to={`/project/${id}`}>
        <div className="project-image-div">
          <img src={image} alt={title} onError={useImageErrorCard} />
        </div>
        <div className="project-title-n-pledge">
          <h3>{title}</h3>
          <div className="pledge-bar-base">
            <p className="pledge-bar-percentage-number">{pledgeStatus}%</p>
            <div
              className="pledge-bar-percentage-bar"
              style={{ width: `${pledgeStatus}%` }}
            ></div>
          </div>
        </div>
        <div className="project-owner-n-location">
          <p>{ownerName ? ownerName : "Loading..."}</p>
          <p>{location ? location : "Loading..."}</p>
        </div>
      </Link>
    </div>
  );
}
