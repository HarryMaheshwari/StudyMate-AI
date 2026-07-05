import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "../api/document.api.js";
import toast from "react-hot-toast";

export default function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,

    onSuccess: async (res) => {
      toast.success(res.message);

      await queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete document."
      );
    },
  });
}