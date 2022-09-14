import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserById } from "../../../services/getUserById";
import Logo from "../../../assets/img/logo.svg";
import { useDefaultAvatar } from "../../../services/useDefaultAvatar";
import Container from "../Container";
import RoundButton from "../RoundButton";
import "./Nav.css";
import MenuIcon from "../../../assets/icons/hamburg-menu.svg";

export default function Nav() {
  const navigate = useNavigate();
  const [navAvatar, setNavAvatar] = useState("");
  const [navUsername, setNavUsername] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const loginStatus = window.localStorage.getItem("login");
  const userId = window.localStorage.getItem("user_id");

  if (userId) {
    getUserById(userId).then(data => {
      const { avatar, username } = data;
      setNavAvatar(avatar);
      setNavUsername(username);
    });
  }

  return (
    <nav>
      <Container variant="nav">
        <Link to="/">
          <img
            src={Logo}
            alt="PIXELFOTO_logo"
            className="header-logo"
            onError={useDefaultAvatar}
          />
        </Link>
        <img
          src={MenuIcon}
          alt="menu"
          onClick={() => {
            setMobileMenu(!mobileMenu);
          }}
          className="mobile-menu-control-button"
        />
        {/* nav on mobile */}
        <div
          className={`${
            mobileMenu
              ? "mobile-menu_items_wrapper"
              : "mobile-menu_items_wrapper-hidden"
          }`}
        >
          <Link
            to="/"
            className="menu_item_nav"
            onClick={() => {
              setMobileMenu(false);
            }}
          >
            Explore Exhibitions
          </Link>
          {!loginStatus ? (
            <div className="mobile-menu_item_auth_group">
              <Link
                to="/login"
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                <RoundButton variant="primary">Login</RoundButton>
              </Link>
              <Link
                to="/sign-up"
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                <RoundButton variant="secondary">Sign up</RoundButton>
              </Link>
            </div>
          ) : (
            <div className="mobile-menu_item_auth_group">
              <Link
                to={`/profile/${userId}`}
                className="menu_item_nav"
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                {navUsername} - Profile
              </Link>
              <Link
                to="/create-project"
                className="menu_item_nav"
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                Create Project
              </Link>
              <p
                variant="secondary"
                onClick={() => {
                  setMobileMenu(false);
                  localStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
                className="menu_item_nav"
                style={{ cursor: "pointer" }}
              >
                Log out
              </p>
            </div>
          )}
        </div>
        {/* nav on web */}
        <div className="menu_items_wrapper">
          <Link to="/" className="menu_item_nav">
            Explore Exhibitions
          </Link>
          {!loginStatus ? (
            <div className="menu_item_auth_group">
              <Link to="/login">
                <RoundButton variant="primary">Login</RoundButton>
              </Link>
              <Link to="/sign-up">
                <RoundButton variant="secondary">Sign up</RoundButton>
              </Link>
            </div>
          ) : (
            <div className="menu_item_auth_group">
              <Link to={`/profile/${userId}`}>
                <div className="nav-authenticated">
                  <img
                    src={navAvatar}
                    alt={`${navUsername}`}
                    onError={useDefaultAvatar}
                    className="nav-avatar-image"
                  />
                  {navUsername}
                </div>
              </Link>
              <Link to="/create-project">
                <RoundButton variant="primary">Create Project</RoundButton>
              </Link>
              <RoundButton
                variant="secondary"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
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
