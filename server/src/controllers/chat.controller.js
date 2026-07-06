import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  sendMessage,
  getChatHistory,
  deleteChat,
} from "../services/chat.service.js";

export const sendChatMessage =
  asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
      throw new Error("Message is required.");
    }

    const response = await sendMessage(
      req.user.id,
      req.params.documentId,
      message
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        response,
        "Message sent successfully."
      )
    );
  });

export const getDocumentChat =
  asyncHandler(async (req, res) => {
    const chat = await getChatHistory(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        chat,
        "Chat fetched successfully."
      )
    );
  });

export const deleteDocumentChat =
  asyncHandler(async (req, res) => {
    await deleteChat(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Chat deleted successfully."
      )
    );
  });