import React, { useState, useEffect } from "react";
import Input from "../common/Form/Input";
import SubmitButton from "../common/Form/SubmitButton";
import { getUserById } from "../../services/getUserById";
import { updateProfileById } from "../../services/updateUserById";

export default function UserProfile({ userId }) {
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState();
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  useEffect(() => {
    getUserById(userId).then(data => {
      setProfileData(data);
      setLoading(false);
    });
  }, [userId]);

  const handleBlur = event => {
    const { id, value } = event.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Update profile with profileData: ", profileData);
    if (
      profileData.username &&
      profileData.email &&
      profileData.avatar &&
      profileData.bio
    ) {
      updateProfileById(userId, token, profileData).then(data => {
        console.log("Update profile response data: ... ", data);
        if (
          data.detail &&
          data.detail === "You do not have permission to perform this action."
        ) {
          setSubmitMessage("You do not have permission to update this project");
          setSubmitResult("fail");
        } else {
          setSubmitMessage("Yah! Profile update successfully!");
          setSubmitResult("success");
        }
      });
    } else {
      setSubmitMessage("Please enter all fields");
      setSubmitResult("fail");
    }
  };

  return loading ? (
    "Loading..."
  ) : (
    <form onSubmit={handleSubmit}>
      {profileData && (
        <>
          <Input
            variant="single_underline"
            type="text"
            id="username"
            label="Username"
            defaultValue={profileData.username}
            onBlur={handleBlur}
          />
          <Input
            variant="single_underline"
            type="email"
            id="email"
            label="Email"
            defaultValue={profileData.email}
            onBlur={handleBlur}
          />
          <Input
            variant="single_underline"
            type="textarea"
            id="bio"
            label="Bio"
            defaultValue={profileData.bio}
            onBlur={handleBlur}
          />
          <Input
            variant="single_underline"
            type="text"
            id="avatar"
            label="Avatar"
            defaultValue={profileData.avatar}
            onBlur={handleBlur}
            src={profileData.avatar}
          />
        </>
      )}

      <SubmitButton
        variant="primary"
        submitMessage={submitMessage}
        result={submitResult}
      >
        Update Now !
      </SubmitButton>
    </form>
  );
}
