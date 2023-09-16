import API from "../index";

export const getAgents = async () => {
  const response = await API.get("api/users/agents");
  return response;
};

export const addAgent = async(data)=>{
  const response = await API.post("api/users/agent-registration",data);
  return response;
}
