const postUser = async credentials => {
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

export const login = async credentials => {
  const data = await postUser(credentials);
  return data;
};
