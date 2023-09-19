import API from "../index";
const subURL = '/agents'

export const getAgents = async () => {
  const response = await API.get(`${subURL}/get-all-agents`);
  return response;
};

export const addAgent = async(data)=>{
  const response = await API.post(`${subURL}/register-agent`,data);
  return response;
}
