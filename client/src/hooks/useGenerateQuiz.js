import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { generateQuiz } from "../api/quiz.api";

export default function useGenerateQuiz() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: generateQuiz,

    onSuccess: (res) => {
      toast.success(res.message);

      navigate(
        `/documents/${res.data.document}/quiz`
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate quiz."
      );
    },
  });
}