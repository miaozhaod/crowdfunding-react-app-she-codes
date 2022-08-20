import React from "react";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Sign up Now!">Hey! Welcome 👐</Banner>
      </Container>
      <Container>
        <SignUpForm />
      </Container>
    </>
  );
}
