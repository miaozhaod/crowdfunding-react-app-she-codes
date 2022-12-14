import React from "react";
import Container from "components/common/Container";
import Banner from "components/common/Banner";
import SignUpForm from "components/modules/SignUp";

export default function SignUpPage() {
  const loginStatus = window.localStorage.getItem("login");

  return loginStatus ? (
    <Container bg={true} variant="banner">
      <Banner heading="Already logged in!">Welcome back 👐</Banner>
    </Container>
  ) : (
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
