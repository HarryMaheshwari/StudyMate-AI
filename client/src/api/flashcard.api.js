import { api } from "../utils/axios";

export const generateFlashcards = async (
  documentId
) => {
  const response = await api.post(
    `/flashcards/${documentId}/generate`
  );

  return response.data;
};

export const getFlashcards = async (
  documentId
) => {
  const response = await api.get(
    `/flashcards/${documentId}`
  );

  return response.data;
};

export const deleteFlashcards = async (
  documentId
) => {
  const response = await api.delete(
    `/flashcards/${documentId}`
  );

  return response.data;
};
