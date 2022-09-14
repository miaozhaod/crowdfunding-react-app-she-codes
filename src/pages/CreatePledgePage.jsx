import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "components/common/Container";
import Banner from "components/common/Banner";
import CreatePledgeForm from "components/modules/CreatePledge";
import { getProjectById } from "services/getProjectById";

export default function CreatePledgePage() {
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    getProjectById(id).then(data => {
      setProjectName(data.title);
    });
  }, [id]);

  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading={`Pledge for ${projectName}`}>
          Thanks for your interest!
        </Banner>
      </Container>
      <Container>
        <CreatePledgeForm project_id={id} />
      </Container>
    </>
  );
}
