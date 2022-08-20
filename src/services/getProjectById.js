const getProject = async id => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/projects/${id}`
  );
  return response.json();
};

export const getProjectById = async id => {
  const data = await getProject(id);
  return data;
};
