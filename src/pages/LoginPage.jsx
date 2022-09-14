import React from "react";
import Container from "components/common/Container";
import Banner from "components/common/Banner";
import LoginForm from "components/modules/Login";

export default function LoginPage() {
  const loginStatus = window.localStorage.getItem("login");
  if (loginStatus) {
    return (
      <>
        <Container bg={true} variant="banner">
          <Banner heading="Already Loggedin!">Welcome back 👐</Banner>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container bg={true} variant="banner">
          <Banner heading="Login Now!">Welcome back 👐</Banner>
        </Container>
        <Container>
          <LoginForm />
        </Container>
      </>
    );
  }
}
