import React from "react";
import "./ProjectPageContent.css";
import SubmitButton from "../common/Form/SubmitButton";

export default function ProjectPageContent({ projectData }) {
  console.log("projectData", projectData);
  const { image, title, goal, date_due, pledges } = projectData;

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

  return (
    <div className="project-page-content">
      <div className="project-page-content-project-details">
        <div className="project-page-content-project-details-img">
          <img src={`${image}`} alt={title} />
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
            {leftDays > 0 ? (
              <>
                <SubmitButton variant="primary-dark">Pledge Now!</SubmitButton>
                <p>
                  This exhibition will only be held if it reaches its goal by
                  the end of {new Date(date_due).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p>
                Thanks for your interest, but this project has due on{" "}
                {new Date(date_due).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="project-page-content-pledges">
        <h3>Pledges:</h3>
        <ul>
          {projectData.pledges
            ? projectData.pledges.map((pledgeData, index) => {
                return (
                  <li key={index}>
                    {pledgeData.amount} from {pledgeData.supporter}
                  </li>
                );
              })
            : "No Pledges"}
        </ul>
      </div>
    </div>
  );
}