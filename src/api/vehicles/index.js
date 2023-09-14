import API from "../index";

export const addVehicleApi = async (data) => {
  const response = await API.post("/api/users/register-vehicle", data);
  return response;
};

export const getVehicles = async()=>{
    const response = await API.get("/api/users/vehicles");
    return response;
}