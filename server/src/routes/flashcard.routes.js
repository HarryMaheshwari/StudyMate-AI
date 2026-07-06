import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  generateDocumentFlashcards,
  getDocumentFlashcards,
  deleteDocumentFlashcards,
} from "../controllers/flashcard.controller.js";

const router = Router();

router.post(
  "/:documentId/generate",
  verifyJWT,
  generateDocumentFlashcards
);

router.get(
  "/:documentId",
  verifyJWT,
  getDocumentFlashcards
);

router.delete(
  "/:documentId",
  verifyJWT,
  deleteDocumentFlashcards
);



export default router;