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
  setProgress,
  clearProgress,
} from "../utils/progressManager.js";

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
    // If note already exists, show 100% progress immediately
    setProgress(documentId, 100, "completed");

    // Clean up progress after 3 seconds
    setTimeout(() => {
      clearProgress(documentId);
    }, 3000);

    return existingNote;
  }

  try {
    // Set initial progress: Preparing
    setProgress(documentId, 10, "preparing");

    // Split extracted text into chunks
    const chunks = chunkText(
      document.extractedText,
      MAX_CHUNK_SIZE
    );

    // Set progress: Processing started
    setProgress(documentId, 20, "processing");

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
      CHUNK_CONCURRENCY,

      (completed, total) => {
        const progress =
          20 + Math.round((completed / total) * 70);

        setProgress(
          documentId,
          progress,
          "processing"
        );
      }
    );

    // Set progress to merging BEFORE the merge operation
    setProgress(documentId, 95, "merging");

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

    // Save final note
    const note = await Note.create({
      owner: userId,
      document: documentId,
      title: document.title,
      content:
        mergedResponse.choices[0].message.content,
    });

    // Set progress: Completed
    setProgress(documentId, 100, "completed");

    return note;
  } catch (error) {
    // If there's an error, set progress to failed state
    setProgress(documentId, 0, "failed");
    throw error;
  } finally {
    // Clean up progress after 5 seconds, regardless of success or failure
    setTimeout(() => {
      clearProgress(documentId);
    }, 5000);
  }
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