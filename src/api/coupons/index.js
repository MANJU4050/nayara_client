import API from "../index";

export const getCoupons= async () => {
  const response = await API.get("api/users/get-coupons");
  return response;
};

