import Document from "../models/document.model.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../config/cloudinary.js";

import DocumentChunk from "../models/documentChunk.model.js";
import Note from "../models/note.model.js";
import Flashcard from "../models/flashcard.model.js";
import Quiz from "../models/quiz.model.js";

import { extractTextFromPdf } from "../utils/pdfExtractor.js";
import { chunkText } from "../utils/chunkText.js";
import { saveDocumentChunks } from "./chunk.service.js";

export const uploadDocument = async (userId, file) => {
  if (!file) {
    throw new Error("Please upload a PDF.");
  }

  const cloudinaryResponse = await uploadToCloudinary(
    file.buffer,
    file.originalname.replace(".pdf", ""),
    "studymate/documents"
  );

  // Save document
  const document = await Document.create({
    owner: userId,
    title: file.originalname.replace(".pdf", ""),
    originalName: file.originalname,
    fileUrl: cloudinaryResponse.secure_url,
    publicId: cloudinaryResponse.public_id,
    fileSize: file.size,
    status: "uploaded",
  });

  try {
    document.status = "extracting";
    await document.save();

    // Extract text
    const extractedText = await extractTextFromPdf(
      document.fileUrl
    );

    // Save extracted text
    document.extractedText = extractedText;

    // Create chunks
    const chunks = chunkText(extractedText);

    // Save chunks into MongoDB
    await saveDocumentChunks(
      userId,
      document._id,
      chunks
    );

    document.status = "ready";

    await document.save();
  } catch (error) {
    console.error(error);

    document.status = "failed";
    await document.save();

    throw error;
  }

  return document;
};

export const getUserDocuments = async (userId) => {
  return await Document.find({
    owner: userId,
  }).sort({
    createdAt: -1,
  });
};

export const getDocumentById = async (
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

  return document;
};

export const deleteDocument = async (
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

  // Delete file from Cloudinary
  await deleteFromCloudinary(document.publicId);

  // Delete all related AI data
  await Promise.all([
    DocumentChunk.deleteMany({
      owner: userId,
      document: documentId,
    }),

    Note.deleteMany({
      owner: userId,
      document: documentId,
    }),

    Flashcard.deleteMany({
      owner: userId,
      document: documentId,
    }),

    Quiz.deleteMany({
      owner: userId,
      document: documentId,
    }),
  ]);

  // Delete document
  await document.deleteOne();

  return;
};