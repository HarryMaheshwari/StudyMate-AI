import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { generateNotes } from "../api/note.api";

export default function useGenerateNotes() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: generateNotes,

    onSuccess: (res) => {
      toast.success(res.message);

      navigate(
        `/documents/${res.data.document}/notes`
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate notes."
      );
    },
  });
}