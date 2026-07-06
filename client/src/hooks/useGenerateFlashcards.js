import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { generateFlashcards } from "../api/flashcard.api";


export default function useGenerateFlashcards() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: generateFlashcards,

    onSuccess: (res) => {
      toast.success(res.message);

      navigate(
        `/documents/${res.data.document}/flashcards`
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate flashcards."
      );
    },
  });
}