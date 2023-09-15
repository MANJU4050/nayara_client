import API from "../index";

export const getAgents = async () => {
  const response = await API.get("api/users/agents");
  return response;
};
