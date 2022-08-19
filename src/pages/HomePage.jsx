import React, { useEffect, useState } from "react";
import Banner from "../components/common/Banner";
import Container from "../components/common/Container";
import GridThreeCol from "../components/common/GridThreeCol";
import ProjectCard from "../components/ProjectCard";

export default function HomePage() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    // get project data from api when we mount our HomePage
    fetch(`${process.env.REACT_APP_API_URL}/projects/`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProjectData(data);
      })
      .catch(err => {
        console.log("err is: ", err);
      });
  }, []);

  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Explore Exhibitions">Children</Banner>
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
