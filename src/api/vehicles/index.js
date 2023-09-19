import API from "../index";
const subURL = "/vehicles";

export const addVehicleApi = async (data) => {
  const response = await API.post(`${subURL}/register-vehicle`, data);
  return response;
};

export const getVehicles = async () => {
  const response = await API.get(`${subURL}/get-all-vehicles`);
  return response;
};

export const deleteVehicle = async (id) => {
  const response = await API.delete(`${subURL}/delete-vehicle/${id}`);
  return response;
};
