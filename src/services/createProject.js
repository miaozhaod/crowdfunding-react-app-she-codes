const postProject = async (token, projectDetails) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectDetails),
  });
  return response.json();
};

export const createProject = async (token, projectDetails) => {
  const data = await postProject(token, projectDetails);
  return data;
};
