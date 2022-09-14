const postPledge = async (token, pledgeDetails) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/pledges/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pledgeDetails),
  });
  return response.json();
};

export const createPledge = async (token, pledgeDetails) => {
  const data = await postPledge(token, pledgeDetails);
  return data;
};
