import { useQuery } from "@tanstack/react-query";

import { getQuiz } from "../api/quiz.api";

export default function useQuiz(documentId) {
  return useQuery({
    queryKey: ["quiz", documentId],

    queryFn: async () => {
      const res = await getQuiz(documentId);

      return res.data;
    },

    enabled: !!documentId,

    retry: false,
  });
}