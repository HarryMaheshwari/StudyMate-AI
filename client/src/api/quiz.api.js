import { api } from "../utils/axios";

export const generateQuiz = async (documentId) => {
  const response = await api.post(
    `/quiz/${documentId}/generate`
  );

  return response.data;
};

export const getQuiz = async (documentId) => {
  const response = await api.get(
    `/quiz/${documentId}`
  );

  return response.data;
};

export const deleteQuiz = async (documentId) => {
  const response = await api.delete(
    `/quiz/${documentId}`
  );

  return response.data;
};