import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/auth.api";
import toast from "react-hot-toast";

export default function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: async (res) => {
      toast.success(res.message);

      await queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Registration failed."
      );
    },
  });
}