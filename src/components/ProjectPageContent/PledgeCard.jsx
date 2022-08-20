import React, { useState, useEffect } from "react";
import { useDefaultAvatar } from "../../services/useDefaultAvatar";

export default function PledgeCard({ pledgeData }) {
  const { amount, anonymous, comment, supporter } = pledgeData;
  const [supporterName, setSupportorName] = useState("");
  const [supporterAvatar, setSupporterAvatar] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${supporter}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSupportorName(data.username);
        setSupporterAvatar(data.avatar);
      })
      .catch(err => console.log("user err", err));
  }, [supporter]);

  return (
    <div className="pledge-card">
      <div>
        <img
          src={supporterAvatar}
          alt={supporterName}
          onError={useDefaultAvatar}
        />
      </div>
      <div>
        <p className="pledge-card-supporter">
          {anonymous ? "Anonymous" : supporterName} pledged {amount}
        </p>
        <p className="pledge-card-comment">{comment}</p>
      </div>
    </div>
  );
}
