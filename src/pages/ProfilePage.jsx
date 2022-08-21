import React from "react";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";

export default function ProfilePage() {
  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Profile"></Banner>
      </Container>
      <Container>Profile WIP</Container>
    </>
  );
}
