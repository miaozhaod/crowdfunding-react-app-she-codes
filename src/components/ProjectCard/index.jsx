import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const { id, image, location, owner, title } = project;
  const [ownerName, setOwnerName] = useState("");
  const [pledgeStatus, setPledgeStatus] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${owner}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setOwnerName(data.username);
      })
      .catch(err => console.log("user err", err));

    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
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
      })
      .catch(err => console.log("project err", err));
  }, [project]);

  return (
    <div className="project-card-container">
      <Link to={`/project/${id}`}>
        <img src={image} alt={title} />
        <div className="project-title-n-pledge">
          <h3>{title}</h3>
          <div className="pledge-bar-base">
            <p className="pledge-bar-percentage-number">{pledgeStatus}%</p>
            <div
              className="pledge-bar-percentage-bar"
              style={{ width: `${pledgeStatus}%` }} // better way?
            ></div>
          </div>
        </div>
        <div className="project-owner-n-location">
          <p>{ownerName}</p>
          <p>{location}</p>
        </div>
      </Link>
    </div>
  );
}