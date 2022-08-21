import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";
import UpdateProjectForm from "../components/UpdateProjectForm";
import { getProjectById } from "../services/getProjectById";

export default function CreateProjectPage() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState();

  useEffect(() => {
    getProjectById(id).then(data => setProjectData(data));
  }, [id]);

  return (
    <>
      <Container bg={true} variant="banner">
        <Banner
          heading={
            projectData ? `${projectData.title}` : "Fetching Project Name ..."
          }
        >
          Update Project
        </Banner>
      </Container>
      <Container>
        <UpdateProjectForm project={projectData} />
      </Container>
    </>
  );
}
