import API from "../index";
const subURL = '/coupons'

export const getCoupons= async () => {
  const response = await API.get(`${subURL}/get-coupons`);
  return response;
};

