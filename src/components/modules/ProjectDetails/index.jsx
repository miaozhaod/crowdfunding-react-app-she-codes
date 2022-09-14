import React from "react";
import { Link } from "react-router-dom";
import SubmitButton from "components/common/Form/SubmitButton";
import PledgeCard from "./PledgeCard";
import { useImageErrorCard } from "services/useImageErrorCard";
import "./style.css";

export default function ProjectPageContent({ projectData }) {
  const { id, description, image, title, goal, date_due, is_open, pledges } =
    projectData;

  const loginStatus = window.localStorage.getItem("login");
  let totalPledgesAmount;
  let numberOfUsersPledged;
  let leftDays;
  if (projectData !== {} && pledges && pledges.length > 0) {
    let totalPledges = [];
    let totalUsersPledged = [];
    pledges.forEach(pledge => {
      totalPledges.push(pledge.amount);
      totalUsersPledged.push(pledge.supporter);
    });
    const uniqueUsersPledged = [...new Set(totalUsersPledged)];
    totalPledgesAmount = totalPledges.reduce((accumulator, value) => {
      return accumulator + value;
    });
    numberOfUsersPledged = uniqueUsersPledged.length;
  }
  if (date_due) {
    const today = new Date();
    leftDays = Math.round(
      (new Date(date_due).getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
  }

  const renderAction = (leftDays, is_open, pledgesStatus) => {
    console.log("pledgesStatus: ", pledgesStatus);
    if (!is_open) {
      return (
        <p>Thanks for your interest, but the author has closed the project</p>
      );
    }
    if (is_open) {
      if (leftDays === 0) {
        return (
          <>
            <Link to={`/create-pledge/${id}`}>
              <SubmitButton variant="primary-dark">Pledge now!</SubmitButton>
            </Link>
            <p>Last day to pledge!</p>
          </>
        );
      }

      if (leftDays > 0) {
        if (pledgesStatus > 0 || !pledgesStatus) {
          return (
            <>
              <Link to={`/create-pledge/${id}`}>
                <SubmitButton variant="primary-dark">Pledge Now!</SubmitButton>
              </Link>
              <p>
                This exhibition will only be held if it reaches its goal by the
                end of {new Date(date_due).toLocaleDateString()}
              </p>
            </>
          );
        }
        if (pledgesStatus <= 0) {
          return (
            <>
              <Link to={`/create-pledge/${id}`}>
                <SubmitButton variant="primary-dark">
                  Still pledge !
                </SubmitButton>
              </Link>
              <p>
                This exhibition has reached their goal, you can still pledge for
                it, or have a look to support other photographers!
              </p>
            </>
          );
        }
      }
    }

    if (leftDays < 0) {
      return (
        <p>
          Thanks for your interest, but this project has due on{" "}
          {new Date(date_due).toLocaleDateString()}
        </p>
      );
    }
  };

  return (
    <div className="project-page-content">
      <div className="project-page-content-project-details">
        <div className="project-page-content-project-details-img">
          <img src={`${image}`} alt={title} onError={useImageErrorCard} />
        </div>
        <div className="project-page-content-project-details-text">
          <div className="project-page-pledge-bar-base">
            <div
              className="project-page-pledge-bar-percentage-bar"
              style={{
                width: `${((totalPledgesAmount / goal) * 100).toFixed(0)}%`,
              }}
            ></div>
          </div>
          <div className="project-page-content-project-details-numbers">
            <div>
              <p className="project-page-content-project-details-numbers-giant gian-blue">
                AU$ {totalPledgesAmount ? totalPledgesAmount : 0}
              </p>
              <p>pledged of AU$ {goal} goal</p>
            </div>
            <div>
              <p className="project-page-content-project-details-numbers-giant">
                {numberOfUsersPledged ? numberOfUsersPledged : 0}
              </p>
              <p>users pledged</p>
            </div>
            <div>
              <p className="project-page-content-project-details-numbers-giant">
                {leftDays}
              </p>
              <p>days to go</p>
            </div>
          </div>
          <div>
            {renderAction(leftDays, is_open, goal - totalPledgesAmount)}
          </div>
        </div>
      </div>
      <div className="project-page-content-project-description">
        <h3>Project Description</h3>
        <p>{description}</p>
      </div>
      <div className="project-page-content-pledges">
        <h3>Pledges Received</h3>
        <div className="project-page-content-pledges-cards">
          {pledges
            ? pledges.map((pledgeData, index) => {
                return <PledgeCard key={index} pledgeData={pledgeData} />;
              })
            : "No Pledges"}
        </div>
      </div>
    </div>
  );
}
