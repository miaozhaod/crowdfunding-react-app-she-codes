import React, { useState } from "react";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({});

  const handleChange = event => {
    const { id, value } = event.target;
    console.log("updated credentials: ", { ...credentials, [id]: value });
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };
  return (
    <form>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handleChange} />
      </div>
      <div>
        <button type="submit" onSubmit={handleSubmit}>
          Login
        </button>
      </div>
    </form>
  );
}
