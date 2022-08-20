import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setOwnerId(data.owner);
        setProjectData(data);
      })
      .catch(err => console.log("err", err));
  }, [id]);

  useEffect(() => {
    getUserById(ownerId).then(data => {
      setOwnerName(data.username);
    });
  }, [ownerId]);

  console.log("projectData", projectData);
  const { title, location } = projectData;
  return (
    <>
      <Container variant="banner" bg={true}>
        <Banner variant="banner-tags" heading={title}>
          <p>{ownerName ? ownerName : "fetching..."}</p>
          <p>{location ? location : "fetching..."}</p>
        </Banner>
      </Container>
      <Container>
        <ProjectPageContent projectData={projectData} />
      </Container>
    </>
  );
}
