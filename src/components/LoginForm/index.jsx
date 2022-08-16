import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = event => {
    const { id, value } = event.target;
    console.log("updated credentials: ", { ...credentials, [id]: value });
    setCredentials({ ...credentials, [id]: value });
  };

  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api-token-auth/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    return response.json();
  };

  // fetch(`${process.env.REACT_APP_API_URL}/api-token-auth/`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(credentials),
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     window.localStorage.setItem("token", data.token);
  //     console.log("Found data: ", data);
  //   });

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Loggin in with: ", credentials);
    if (credentials.username && credentials.password) {
      const data = await postData();
      window.localStorage.setItem("token", data.token);
      navigate("/");
      // postData().then(data => {
      //   window.localStorage.setItem("token", data.token);
      //   console.log("Found data: ", data);
      // });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handleChange} />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
