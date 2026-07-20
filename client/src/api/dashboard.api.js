import { api } from "../utils/axios";

export const getDashboardData = async () => {
  const { data } = await api.get("/dashboard");

  return data.data;
};