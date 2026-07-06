import { api } from "../utils/axios";

export const sendMessage = async (
  documentId,
  message
) => {
  const response = await api.post(
    `/chat/${documentId}`,
    {
      message,
    }
  );

  return response.data;
};

export const getChat = async (
  documentId
) => {
  const response = await api.get(
    `/chat/${documentId}`
  );

  return response.data;
};

export const deleteChat = async (
  documentId
) => {
  const response = await api.delete(
    `/chat/${documentId}`
  );

  return response.data;
};