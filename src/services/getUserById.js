const getUser = async id => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`);
  return response.json();
};

export const getUserById = async id => {
  const data = await getUser(id);
  return data;
};
