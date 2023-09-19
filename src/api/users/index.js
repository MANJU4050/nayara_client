import API from "../index";
const subURL = '/users'

export const loginApi = async (data) => {
  const response = await API.post(`${subURL}/login`, data);
  return response;
};
