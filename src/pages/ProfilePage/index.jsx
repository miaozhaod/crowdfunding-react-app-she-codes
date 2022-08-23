import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProjects } from "../../services/getAllProjects";
import Container from "../../components/common/Container";
import Banner from "../../components/common/Banner";
import GridThreeCol from "../../components/common/GridThreeCol";
import UserProjectCard from "../../components/ProjectCard/UserProjectCard";
import UserProfile from "../../components/UserProfile";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { id } = useParams();
  const [userProjects, setUserProjects] = useState([]);
  const [content, setContent] = useState("projects");

  useEffect(() => {
    getAllProjects().then(data => {
      let userProjects = [];
      data.forEach(item => {
        if (item.owner.toString() === id.toString()) {
          userProjects.push(item);
        }
      });
      setUserProjects(userProjects);
    });
  }, [id]);

  return (
    <>
      <Container bg={true} variant="banner">
        <Banner heading="Profile"></Banner>
      </Container>
      <Container>
        <div className="profile-container">
          <div className="profile-page-tabs">
            <h2
              onClick={() => {
                setContent("projects");
              }}
              className={`${content === "projects" ? "active" : ""}`}
            >
              Your Projects
            </h2>
            <h2
              onClick={() => {
                setContent("profile");
              }}
              className={`${content === "profile" ? "active" : ""}`}
            >
              Your Profile
            </h2>
          </div>
          {content === "projects" ? (
            userProjects.length > 0 ? (
              <GridThreeCol>
                {userProjects.map((project, index) => (
                  <UserProjectCard key={index} project={project} />
                ))}
              </GridThreeCol>
            ) : (
              "Loading..."
            )
          ) : content === "profile" ? (
            <UserProfile userId={id} />
          ) : (
            ""
          )}
        </div>
      </Container>
    </>
  );
}
