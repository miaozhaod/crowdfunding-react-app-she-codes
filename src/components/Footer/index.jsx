import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo-mono.svg";
import Container from "../common/Container";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <Container bg={true} variant="footer">
        <div className="footer-nav">
          <div className="branding-section">
            <img src={Logo} alt="PIXELFOTO_logo" className="footer-logo" />
            <p>
              PixelFoto is a crowdfunding platform to support photographers to
              open exhibitions, to share their works, and get to grow.
            </p>
          </div>
          <nav className="nav-section">
            <div>
              <p className="nav-section-title">Get Started</p>
              <div className="nav-section-menu">
                <Link to="/login" className="nav-section-menu-item">
                  Login
                </Link>
                <Link to="/login" className="nav-section-menu-item">
                  Sign up
                </Link>
              </div>
            </div>
            <div className="nav-section-follow-us">
              <p className="nav-section-title">Follow Us</p>
            </div>
          </nav>
        </div>
        <div className="breakline"></div>
        <div className="footer-copyright">
          <p>{`© ${new Date().getFullYear()} PixelFoto. All rights reserved.`}</p>
          <p>
            <span>XX</span> exhibitions held through PixelFoto
          </p>
        </div>
      </Container>
    </footer>
  );
}
