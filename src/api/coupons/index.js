import API from "../index";
const subURL = "/coupons";

export const getCoupons = async ({ page }) => {
  const response = await API.get(`${subURL}/get-coupons?page=${page}&limit=50`);
  return response;
};
