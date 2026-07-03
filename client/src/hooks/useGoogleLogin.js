import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleLogin } from "../api/auth.api";
import toast from "react-hot-toast";

export default function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleLogin,

    onSuccess: async (res) => {
      toast.success(res.message);

      await queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Google login failed."
      );
    },
  });
}