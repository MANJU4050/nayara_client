import API from "../index";

export const loginApi = async (data) => {
  const response = await API.post("/api/users/login", data);
  return response;
};
