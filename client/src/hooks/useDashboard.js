import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard.api";

export default function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    staleTime: 1000 * 60 * 5,
  });
}