import Document from "../models/document.model.js";
import Quiz from "../models/quiz.model.js";

import groq from "../utils/groq.js";

import { QUIZ_PROMPT } from "../utils/prompts.js";

import {
  GROQ_MODEL,
  MAX_CHUNK_SIZE,
  CHUNK_CONCURRENCY,
} from "../utils/constants.js";

import { chunkText } from "../utils/chunkText.js";
import { processChunks } from "../utils/processChunks.js";
import { parseAIJson } from "../utils/parseAIJson.js";

export const generateQuiz = async (
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

  const existingQuiz = await Quiz.findOne({
    owner: userId,
    document: documentId,
  });

  if (existingQuiz) {
    return existingQuiz;
  }

  const chunks = chunkText(
    document.extractedText,
    MAX_CHUNK_SIZE
  );

  const quizChunks = await processChunks(
    chunks,
    async (chunk) => {
      const response =
        await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: [
            {
              role: "user",
              content: `
${QUIZ_PROMPT}

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

  const questions = quizChunks.flat();

  const quiz = await Quiz.create({
    owner: userId,
    document: documentId,
    title: document.title,
    questions,
  });

  return quiz;
};

export const getQuiz = async (
  userId,
  documentId
) => {
  const quiz = await Quiz.findOne({
    owner: userId,
    document: documentId,
  });

  if (!quiz) {
    throw new Error("Quiz not found.");
  }

  return quiz;
};

export const deleteQuiz = async (
  userId,
  documentId
) => {
  const quiz = await Quiz.findOne({
    owner: userId,
    document: documentId,
  });

  if (!quiz) {
    throw new Error("Quiz not found.");
  }

  await quiz.deleteOne();
};