import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/getAllProjects";
import Banner from "../components/common/Banner";
import Container from "../components/common/Container";
import GridThreeCol from "../components/common/GridThreeCol";
import ProjectCard from "../components/ProjectCard";

export default function HomePage() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    getAllProjects().then(data => {
      setProjectData(data);
    });
  }, []);

  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Explore Exhibitions">
          Have a look into our amazing exhibitions
        </Banner>
      </Container>
      <Container>
        {projectData.length > 0 ? (
          <GridThreeCol>
            {projectData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </GridThreeCol>
        ) : (
          "Loading..."
        )}
      </Container>
    </>
  );
}
