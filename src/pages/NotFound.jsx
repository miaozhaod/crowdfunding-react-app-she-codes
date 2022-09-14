import React from "react";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";

export default function NotFound() {
  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Page not found">Sorry, the page does not exist</Banner>
      </Container>
    </>
  );
}
