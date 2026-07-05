import { api } from "../utils/axios";

export const generateNotes = async (documentId) => {
  const response = await api.post(
    `/notes/${documentId}/generate`
  );

  return response.data;
};

export const getNotes = async (documentId) => {
  const response = await api.get(
    `/notes/${documentId}`
  );

  return response.data;
};

export const deleteNotes = async (documentId) => {
  const response = await api.delete(
    `/notes/${documentId}`
  );

  return response.data;
};