import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

import { getDocument, getDocuments, removeDocument, uploadPdf } from "../controllers/document.controller.js";

const router = Router();

router.post(
  "/upload",
  verifyJWT,
  upload.single("document"),
  uploadPdf
);

router.get(
  "/",
  verifyJWT,
  getDocuments
);

router.get(
  "/:id",
  verifyJWT,
  getDocument
);

router.delete(
  "/:id",
  verifyJWT,
  removeDocument
);


export default router;