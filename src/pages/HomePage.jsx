import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectaCard";

export default function HomePage() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    // get project data from api when we mount our HomePage
    fetch(`${process.env.REACT_APP_API_URL}/projects/`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("data is:", data);
        setProjectData(data);
      })
      .catch(err => {
        console.log("err is: ", err);
      });
  }, []);

  return (
    <div>
      {projectData.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
