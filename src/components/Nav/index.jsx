import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import Container from "../common/Container";
import RoundButton from "../common/RoundButton";
import "./Nav.css";

export default function Nav() {
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
          <div className="menu_item_auth_group">
            <Link to="/login">
              <RoundButton variant="primary">Login</RoundButton>
            </Link>
            <Link to="/login">
              <RoundButton variant="secondary">Sign up</RoundButton>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
