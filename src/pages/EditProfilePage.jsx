import React from "react";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";

export default function LoginPage() {
  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Profile"></Banner>
      </Container>
      <Container>Edit Profile WIP</Container>
    </>
  );
}
