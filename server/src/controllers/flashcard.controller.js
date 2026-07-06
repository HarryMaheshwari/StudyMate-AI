import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  generateFlashcards,
  getFlashcards,
  deleteFlashcards,
} from "../services/flashcard.service.js";

export const generateDocumentFlashcards =
  asyncHandler(async (req, res) => {
    const flashcards =
      await generateFlashcards(
        req.user.id,
        req.params.documentId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        flashcards,
        "Flashcards generated successfully."
      )
    );
  });

export const getDocumentFlashcards =
  asyncHandler(async (req, res) => {
    const flashcards =
      await getFlashcards(
        req.user.id,
        req.params.documentId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        flashcards,
        "Flashcards fetched successfully."
      )
    );
  });

export const deleteDocumentFlashcards =
  asyncHandler(async (req, res) => {
    await deleteFlashcards(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Flashcards deleted successfully."
      )
    );
  });

