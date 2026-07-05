import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  generateNotes,
  getDocumentNote,
  deleteNote,
} from "../services/note.service.js";

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