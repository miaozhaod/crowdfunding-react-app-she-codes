import { Link } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  console.log(project);
  return (
    <div className="project-card">
      <Link to={`/project/${project.id}`}>
        <img src={project.image} alt="" />
        <h3>{project.title}</h3>
      </Link>
    </div>
  );
}
