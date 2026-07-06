import { useQuery } from "@tanstack/react-query";
import { getFlashcards } from "../api/flashcard.api";

export default function useFlashcards(id) {
  return useQuery({
    queryKey: ["flashcards", id],

    queryFn: async () => {
      const res = await getFlashcards(id);
      return res.data;
    },

    enabled: !!id,
    retry: false,
  });
}