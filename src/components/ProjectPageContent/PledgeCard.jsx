import React, { useState, useEffect } from "react";
import { useDefaultAvatar } from "../../services/useDefaultAvatar";
import { getUserById } from "../../services/getUserById";
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
