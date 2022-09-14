import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/img/logo-mono.svg";
import Container from "../Container";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const loginStatus = window.localStorage.getItem("login");
  const userId = window.localStorage.getItem("user_id");

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
              {!loginStatus ? (
                <>
                  <p className="nav-section-title">Get Started</p>
                  <div className="nav-section-menu">
                    <Link to="/login" className="nav-section-menu-item">
                      Login
                    </Link>
                    <Link to="/login" className="nav-section-menu-item">
                      Sign up
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="nav-section-title">Start Exploring</p>
                  <div className="nav-section-menu">
                    <Link to={`/profile/${userId}`}>Profile</Link>
                    <Link to="/create-project">Create Project</Link>
                    <p
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      Log out
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="nav-section-follow-us">
              <p className="nav-section-title">Made by Miao</p>
              <div></div>
            </div>
          </nav>
        </div>
        <div className="breakline"></div>
        <div className="footer-copyright">
          <p>{`© ${new Date().getFullYear()} PixelFoto. All rights reserved.`}</p>
        </div>
      </Container>
    </footer>
  );
}
