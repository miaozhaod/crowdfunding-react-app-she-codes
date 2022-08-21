const getProjects = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`);
  return response.json();
};

export const getAllProjects = async () => {
  const data = await getProjects();
  const dataSortedById = data.sort((a, b) => a.id - b.id);
  return dataSortedById;
};
