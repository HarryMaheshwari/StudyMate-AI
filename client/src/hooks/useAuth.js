import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";

export default function useAuth() {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await getCurrentUser();
      return res.data;   
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}