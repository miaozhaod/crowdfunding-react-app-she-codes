const putProfile = async (id, token, profileData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  return response.json();
};

export const updateProfileById = async (id, token, profileData) => {
  const data = await putProfile(id, token, profileData);
  return data;
};
