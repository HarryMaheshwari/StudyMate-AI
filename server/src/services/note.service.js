import Document from "../models/document.model.js";
import Note from "../models/note.model.js";

import groq from "../utils/groq.js";
import {
  NOTES_PROMPT,
  MERGE_NOTES_PROMPT,
} from "../utils/prompts.js";

import { chunkText } from "../utils/chunkText.js";
import { processChunks } from "../utils/processChunks.js";

import {
  GROQ_MODEL,
  MAX_CHUNK_SIZE,
  CHUNK_CONCURRENCY,
} from "../utils/constants.js";

export const generateNotes = async (
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

  // Prevent duplicate notes
  const existingNote = await Note.findOne({
    document: documentId,
  });

  if (existingNote) {
    return existingNote;
  }

  console.log(document.extractedText);
  console.log(document.extractedText.length);

  // Split extracted text into chunks
  const chunks = chunkText(
    document.extractedText,
    MAX_CHUNK_SIZE
  );

  console.log(chunks);

  // Generate notes for chunks concurrently
  const chunkNotes = await processChunks(
    chunks,
    async (chunk) => {
      const response =
        await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: [
            {
              role: "user",
              content: `
${NOTES_PROMPT}

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

      return response.choices[0].message.content;
    },
    CHUNK_CONCURRENCY
  );

  // Merge all generated notes into one
  const mergedResponse =
    await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: `
${MERGE_NOTES_PROMPT}

======================
CHUNK NOTES
======================

${chunkNotes.join("\n\n")}

======================
END OF CHUNK NOTES
======================
`,
        },
      ],
    });

  console.log("Chunk Notes:");
  console.log(chunkNotes);

  console.log("Merged Response:");
  console.log(mergedResponse);

  // Save final note
  const note = await Note.create({
    owner: userId,
    document: documentId,
    title: document.title,
    content:
      mergedResponse.choices[0].message.content,
  });

  return note;
};

export const getDocumentNote = async (
  userId,
  documentId
) => {
  const note = await Note.findOne({
    owner: userId,
    document: documentId,
  });

  if (!note) {
    throw new Error("Notes not found.");
  }

  return note;
};

export const deleteNote = async (
  userId,
  documentId
) => {
  const note = await Note.findOne({
    owner: userId,
    document: documentId,
  });

  if (!note) {
    throw new Error("Notes not found.");
  }

  await note.deleteOne();
};