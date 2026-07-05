import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotes } from "../api/note.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteNotes() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotes,

    onSuccess: (res, documentId) => {
      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["notes", documentId],
      });

      navigate(`/documents/${documentId}`);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete notes."
      );
    },
  });
}