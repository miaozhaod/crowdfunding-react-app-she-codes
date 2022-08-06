import React from "react";
import { allProjects } from "../data";
import ProjectCard from "../components/ProjectaCard";

export default function HomePage() {
  return (
    <div>
      {allProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
