import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  generateDocumentNotes,
  getNotes,
  deleteNotes,
  streamNoteProgress,
} from "../controllers/note.controller.js";

const router = Router();

router.post(
  "/:documentId/generate",
  verifyJWT,
  generateDocumentNotes
);

router.get(
  "/:documentId",
  verifyJWT,
  getNotes
);

router.get(
  "/:documentId/progress",
  verifyJWT,
  streamNoteProgress
);

router.delete(
  "/:noteId",
  verifyJWT,
  deleteNotes
);

export default router;