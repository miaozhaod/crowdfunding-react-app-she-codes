export const deleteProjectById = async (id, token) => {
  fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
};
