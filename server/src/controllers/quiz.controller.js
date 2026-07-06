import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  generateQuiz,
  getQuiz,
  deleteQuiz,
} from "../services/quiz.service.js";

export const generateDocumentQuiz =
  asyncHandler(async (req, res) => {
    const quiz = await generateQuiz(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        quiz,
        "Quiz generated successfully."
      )
    );
  });

export const getDocumentQuiz =
  asyncHandler(async (req, res) => {
    const quiz = await getQuiz(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        quiz,
        "Quiz fetched successfully."
      )
    );
  });

export const deleteDocumentQuiz =
  asyncHandler(async (req, res) => {
    await deleteQuiz(
      req.user.id,
      req.params.documentId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Quiz deleted successfully."
      )
    );
  });