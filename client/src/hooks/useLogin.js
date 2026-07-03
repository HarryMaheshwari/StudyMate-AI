import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: async (res) => {
      toast.success(res.message);

      await queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    },
  });
}