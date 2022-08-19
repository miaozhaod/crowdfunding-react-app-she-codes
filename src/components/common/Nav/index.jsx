import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/img/logo.svg";
import Container from "../Container";
import RoundButton from "../RoundButton";
import "./Nav.css";

export default function Nav() {
  const [navAvatar, setNavAvatar] = useState("");
  const [navUsername, setNavUsername] = useState("");
  const [navDropdown, setNavDropdown] = useState(false);
  const loginStatus = window.localStorage.getItem("login");
  const userId = window.localStorage.getItem("user_id");

  if (userId) {
    const getUser = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}`
      );
      return response.json();
    };

    getUser().then(data => {
      const { avatar, username } = data;
      setNavAvatar(avatar);
      setNavUsername(username);
    });
  }

  return (
    <nav>
      <Container variant="nav">
        <Link to="/">
          <img src={Logo} alt="PIXELFOTO_logo" className="header-logo" />
        </Link>
        <div className="menu_items_wrapper">
          <Link to="/" className="menu_item_home">
            Explore Exhibitions
          </Link>
          {!loginStatus ? (
            <div className="menu_item_auth_group">
              <Link to="/login">
                <RoundButton variant="primary">Login</RoundButton>
              </Link>
              <Link to="/login">
                <RoundButton variant="secondary">Sign up</RoundButton>
              </Link>
            </div>
          ) : (
            <div className="menu_item_auth_group">
              <Link to="/edit-profile"> Edit Profile</Link>
              <Link to="/login">
                <RoundButton variant="primary">Create Project</RoundButton>
              </Link>
              <RoundButton
                variant="secondary"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Log out
              </RoundButton>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}
