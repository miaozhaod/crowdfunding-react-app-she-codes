import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/getAllProjects";
import Banner from "components/common/Banner";
import Container from "components/common/Container";
import GridThreeCol from "components/common/GridThreeCol";
import ProjectCard from "components/modules/Home/ProjectCard";

export default function HomePage() {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllProjects().then(data => {
      setProjectData(data);
      setLoading(false);
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
        {loading === false ? (
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
