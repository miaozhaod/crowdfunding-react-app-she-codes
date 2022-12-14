import React, { useState, useEffect } from "react";
import DefaultAvatar from "assets/img/default-avatar.svg";
import { useDefaultAvatar } from "services/useDefaultAvatar";
import { getUserById } from "services/getUserById";

export default function PledgeCard({ pledgeData }) {
  const { amount, anonymous, comment, supporter } = pledgeData;
  const [supporterName, setSupportorName] = useState("");
  const [supporterAvatar, setSupporterAvatar] = useState("");

  useEffect(() => {
    getUserById(supporter).then(data => {
      setSupportorName(data.username);
      setSupporterAvatar(data.avatar);
    });
  }, [supporter]);

  return (
    <div className="pledge-card">
      <div className="pledge-card-avatar-div">
        <img
          className="pledge-card-avatar-img"
          src={anonymous ? DefaultAvatar : supporterAvatar}
          alt={supporterName}
          onError={useDefaultAvatar}
        />
      </div>
      <div>
        <p className="pledge-card-supporter">
          {anonymous ? "Anonymous" : supporterName} pledged AU${amount}
        </p>
        <p className="pledge-card-comment">{comment}</p>
      </div>
    </div>
  );
}
