import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadDocument } from "../api/document.api";
import toast from "react-hot-toast";

export default function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDocument,

    onSuccess: async (res) => {
      toast.success(res.message);

      await queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Upload failed."
      );
    },
  });
}