import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { sendMessage } from "../api/chat.api";

export default function useSendMessage(documentId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message) =>
      sendMessage(documentId, message),

    onMutate: async (message) => {
      await queryClient.cancelQueries({
        queryKey: ["chat", documentId],
      });

      const previousChat =
        queryClient.getQueryData([
          "chat",
          documentId,
        ]);

      queryClient.setQueryData(
        ["chat", documentId],
        (old) => ({
          ...(old || {}),
          messages: [
            ...(old?.messages || []),
            {
              role: "user",
              content: message,
            },
            {
              role: "assistant",
              content: "__thinking__",
            },
          ],
        })
      );

      return {
        previousChat,
      };
    },

    onSuccess: (res) => {
      queryClient.setQueryData(
        ["chat", documentId],
        (old) => ({
          ...(old || {}),
          messages: [
            ...(old.messages.slice(0, -1)),
            {
              role: "assistant",
              content: res.data.reply,
            },
          ],
        })
      );
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(
        ["chat", documentId],
        context.previousChat
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to send message."
      );
    },
  });
}