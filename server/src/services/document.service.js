import Document from "../models/document.model.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../config/cloudinary.js";
import { extractTextFromPdf } from "../utils/pdfExtractor.js";

export const uploadDocument = async (userId, file) => {
  if (!file) {
    throw new Error("Please upload a PDF.");
  }

const cloudinaryResponse = await uploadToCloudinary(
  file.buffer,
  file.originalname.replace(".pdf", ""),
  "studymate/documents"
);

  // Save document in MongoDB
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
    // Update status while extracting
    document.status = "extracting";
    await document.save();

    // Extract PDF text
    const extractedText = await extractTextFromPdf(
      document.fileUrl
    );

    // Save extracted text
    document.extractedText = extractedText;
    document.status = "ready";

    await document.save();
  } catch (error) {
  console.error(error.stack);

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

export const getDocumentById = async (userId, documentId) => {
  const document = await Document.findOne({
    _id: documentId,
    owner: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  return document;
};

export const deleteDocument = async (userId, documentId) => {
  const document = await Document.findOne({
    _id: documentId,
    owner: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  await deleteFromCloudinary(document.publicId);

  await document.deleteOne();
};