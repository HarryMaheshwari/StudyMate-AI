import Document from "../models/document.model.js";
import Flashcard from "../models/flashcard.model.js";

import groq from "../utils/groq.js";

import {
  FLASHCARD_PROMPT,
} from "../utils/prompts.js";

import {
  GROQ_MODEL,
  MAX_CHUNK_SIZE,
  CHUNK_CONCURRENCY,
} from "../utils/constants.js";

import { chunkText } from "../utils/chunkText.js";
import { processChunks } from "../utils/processChunks.js";
import { parseAIJson } from "../utils/parseAIJson.js";

export const generateFlashcards = async (
  userId,
  documentId
) => {
  const document = await Document.findOne({
    _id: documentId,
    owner: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  if (!document.extractedText) {
    throw new Error("Document text not extracted.");
  }

  // Prevent duplicate flashcards
  const existingFlashcards =
    await Flashcard.findOne({
      owner: userId,
      document: documentId,
    });

  if (existingFlashcards) {
    return existingFlashcards;
  }

  const chunks = chunkText(
    document.extractedText,
    MAX_CHUNK_SIZE
  );

  const flashcards = await processChunks(
    chunks,
    async (chunk) => {
      const response =
        await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: [
            {
              role: "user",
              content: `
${FLASHCARD_PROMPT}

======================
STUDY MATERIAL
======================

${chunk}

======================
END OF STUDY MATERIAL
======================
`,
            },
          ],
        });

      return parseAIJson(
        response.choices[0].message.content
      );
    },
    CHUNK_CONCURRENCY
  );

  // Merge all chunk arrays
  const cards = flashcards.flat();

  const savedFlashcards =
    await Flashcard.create({
      owner: userId,
      document: documentId,
      title: document.title,
      cards,
    });

  return savedFlashcards;
};

export const getFlashcards = async (
  userId,
  documentId
) => {
  const flashcards =
    await Flashcard.findOne({
      owner: userId,
      document: documentId,
    });

  if (!flashcards) {
    throw new Error("Flashcards not found.");
  }

  return flashcards;
};

export const deleteFlashcards = async (
  userId,
  documentId
) => {
  const flashcards =
    await Flashcard.findOne({
      owner: userId,
      document: documentId,
    });

  if (!flashcards) {
    throw new Error("Flashcards not found.");
  }

  await flashcards.deleteOne();
};

