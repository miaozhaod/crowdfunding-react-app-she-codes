import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";
import CreateProjectForm from "../components/CreateProjectForm";

export default function CreateProjectPage() {
  const loginStatus = window.localStorage.getItem("login");
  if (loginStatus) {
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
  } else {
    return (
      <>
        <Container bg={true} variant="banner">
          <Banner heading="Login first to create a project">
            <Link to="/login">Login now</Link>
          </Banner>
        </Container>
      </>
    );
  }
}
