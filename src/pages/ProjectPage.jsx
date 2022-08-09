import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProjectPage() {
  console.log("this is project page");
  const [projectData, setProjectData] = useState([]);
  const { id } = useParams();
  console.log("api url: ", `${process.env.REACT_APP_API_URL}/projects/${id}`);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("data", data);
        setProjectData(data);
      })
      .catch(err => console.log("err", err));
  }, []);

  console.log("projectData", projectData);

  return (
    <>
      <h1>{projectData.title}</h1>
      <h3>Created at: {projectData.date_created}</h3>
      <h3>{`Status: ${projectData.is_open}`}</h3>
      <img src={`${projectData.image}`} alt="" />
      <h3>Pledges:</h3>
      <ul>
        {projectData.pledges
          ? projectData.pledges.map((pledgeData, index) => {
              return (
                <li key={index}>
                  {pledgeData.amount} from {pledgeData.supporter}
                </li>
              );
            })
          : "No Pledges"}
      </ul>
    </>
  );
}
