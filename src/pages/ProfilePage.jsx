import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProjects } from "../services/getAllProjects";
import Container from "../components/common/Container";
import Banner from "../components/common/Banner";
import GridThreeCol from "../components/common/GridThreeCol";
import UserProjectCard from "../components/ProjectCard/UserProjectCard";

export default function ProfilePage() {
  const { id } = useParams();
  const [userProjects, setUserProjects] = useState([]);

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
        <div>
          <h2>Your Projects</h2>
          {userProjects.length > 0 ? (
            <GridThreeCol>
              {userProjects.map((project, index) => (
                <UserProjectCard key={index} project={project} />
              ))}
            </GridThreeCol>
          ) : (
            "Loading..."
          )}
        </div>
      </Container>
    </>
  );
}
