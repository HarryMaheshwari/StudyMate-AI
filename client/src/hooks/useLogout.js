import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../api/auth.api";
import toast from "react-hot-toast";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: async (res) => {
      toast.success(res.message);

      queryClient.removeQueries({
        queryKey: ["auth-user"],
      });

      window.location.href = "/login";
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Logout failed."
      );
    },
  });
}