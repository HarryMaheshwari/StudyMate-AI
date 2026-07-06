import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  sendChatMessage,
  getDocumentChat,
  deleteDocumentChat,
} from "../controllers/chat.controller.js";

const router = Router();

router.post(
  "/:documentId",
  verifyJWT,
  sendChatMessage
);

router.get(
  "/:documentId",
  verifyJWT,
  getDocumentChat
);

router.delete(
  "/:documentId",
  verifyJWT,
  deleteDocumentChat
);

export default router;