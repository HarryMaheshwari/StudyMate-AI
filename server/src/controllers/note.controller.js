import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  generateNotes,
  getDocumentNote,
  deleteNote,
} from "../services/note.service.js";
import { getProgress } from "../utils/progressManager.js";

export const generateDocumentNotes =
  asyncHandler(async (req, res) => {
    const note = await generateNotes(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        note,
        "Notes generated successfully."
      )
    );
  });

export const getNotes =
  asyncHandler(async (req, res) => {
    const note = await getDocumentNote(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        note,
        "Notes fetched successfully."
      )
    );
  });

export const deleteNotes =
  asyncHandler(async (req, res) => {
    await deleteNote(
      req.user.id,
      req.params.noteId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Notes deleted successfully."
      )
    );
  });


export const streamNoteProgress = (req, res) => {
  const { documentId } = req.params;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send initial state immediately
  res.write(
    `data: ${JSON.stringify(
      getProgress(documentId)
    )}\n\n`
  );

  const interval = setInterval(() => {
    const progress = getProgress(documentId);

    res.write(
      `data: ${JSON.stringify(progress)}\n\n`
    );

    if (
      progress.stage === "completed" ||
      progress.stage === "failed"
    ) {
      clearInterval(interval);
      res.end();
    }
  }, 300);

  req.on("close", () => {
    clearInterval(interval);
  });
};