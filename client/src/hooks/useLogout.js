import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth.api";
import toast from "react-hot-toast";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: (res) => {
      toast.success(res.message);

      // Clear all cached queries (documents, notes, auth, etc.)
      queryClient.clear();

      // Navigate without leaving dashboard in history
      navigate("/login", { replace: true });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Logout failed."
      );

      // If the backend already cleared cookies but returned an error,
      // don't leave stale authenticated data in the cache.
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
}