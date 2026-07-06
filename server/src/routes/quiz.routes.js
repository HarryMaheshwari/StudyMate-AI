import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  generateDocumentQuiz,
  getDocumentQuiz,
  deleteDocumentQuiz,
} from "../controllers/quiz.controller.js";

const router = Router();

router.post(
  "/:documentId/generate",
  verifyJWT,
  generateDocumentQuiz
);

router.get(
  "/:documentId",
  verifyJWT,
  getDocumentQuiz
);

router.delete(
  "/:documentId",
  verifyJWT,
  deleteDocumentQuiz
);

export default router;