import { useQuery } from "@tanstack/react-query";
import { getChat } from "../api/chat.api";

export default function useChat(documentId) {
  return useQuery({
    queryKey: ["chat", documentId],

    queryFn: async () => {
      const res = await getChat(documentId);
      return res.data;
    },

    enabled: !!documentId,
  });
}