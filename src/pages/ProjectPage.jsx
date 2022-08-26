import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/getProjectById";
import { getUserById } from "../services/getUserById";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";
import ProjectPageContent from "../components/ProjectPageContent";

export default function ProjectPage() {
  const [projectData, setProjectData] = useState({});
  const { id } = useParams();
  const [ownerId, setOwnerId] = useState("");
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    getProjectById(id).then(data => {
      setOwnerId(data.owner);
      setProjectData(data);
    });
  }, [id]);

  useEffect(() => {
    getUserById(ownerId).then(data => {
      setOwnerName(data.username);
    });
  }, [ownerId]);

  const { title, location } = projectData;
  return (
    <>
      <Container variant="banner" bg={true}>
        <Banner variant="banner-tags" heading={title}>
          <p>{ownerName ? ownerName : "Loading..."}</p>
          <p>{location ? location : "Loading..."}</p>
        </Banner>
      </Container>
      <Container>
        <ProjectPageContent projectData={projectData} />
      </Container>
    </>
  );
}
