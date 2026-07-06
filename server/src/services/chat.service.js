import Chat from "../models/chat.model.js";
import Document from "../models/document.model.js";
import DocumentChunk from "../models/documentChunk.model.js";
import { findRelevantChunks } from "../utils/findRelevantChunks.js";

import groq from "../utils/groq.js";

import {
  CHAT_PROMPT,
} from "../utils/prompts.js";

import {
  GROQ_MODEL,
} from "../utils/constants.js";

export const sendMessage = async (
  userId,
  documentId,
  message
) => {
  const document = await Document.findOne({
    _id: documentId,
    owner: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  const chunks = await DocumentChunk.find({
    owner: userId,
    document: documentId,
  }).sort({
    chunkIndex: 1,
  });

  if (!chunks.length) {
    throw new Error("Document chunks not found.");
  }

  const relevantChunks =
  findRelevantChunks(chunks, message);

const studyMaterial =
  relevantChunks
    .map((chunk) => chunk.content)
    .join("\n\n");

  let chat = await Chat.findOne({
    owner: userId,
    document: documentId,
  });

  if (!chat) {
    chat = await Chat.create({
      owner: userId,
      document: documentId,
      messages: [],
    });
  }

  const response =
    await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content: CHAT_PROMPT,
        },

        {
          role: "user",
          content: `
=========================
STUDY MATERIAL
=========================

${studyMaterial}

=========================
QUESTION
=========================

${message}
`,
        },
      ],
    });

  const reply =
    response.choices[0].message.content;

  chat.messages.push({
    role: "user",
    content: message,
  });

  chat.messages.push({
    role: "assistant",
    content: reply,
  });

  await chat.save();

  return {
    reply,
  };
};

export const getChatHistory = async (
  userId,
  documentId
) => {
  const chat = await Chat.findOne({
    owner: userId,
    document: documentId,
  });

  if (!chat) {
    return {
      messages: [],
    };
  }

  return chat;
};

export const deleteChat = async (
  userId,
  documentId
) => {
  await Chat.deleteOne({
    owner: userId,
    document: documentId,
  });
};