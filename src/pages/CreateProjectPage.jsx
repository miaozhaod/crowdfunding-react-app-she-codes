import React from "react";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";
import CreateProjectForm from "../components/CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Plan your exhibition">
          Let’s start to plan for your exihibition now!
        </Banner>
      </Container>
      <Container>
        <CreateProjectForm />
      </Container>
    </>
  );
}
