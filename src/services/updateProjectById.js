const putProject = async (id, token, projectDetails) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/projects/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDetails),
    }
  );
  return response.json();
};

export const updateProjectById = async (id, token, projectDetails) => {
  const data = await putProject(id, token, projectDetails);
  return data;
};
