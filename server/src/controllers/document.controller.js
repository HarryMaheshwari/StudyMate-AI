import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  uploadDocument,
  getUserDocuments,
  getDocumentById,
  deleteDocument,
} from "../services/document.service.js";


export const uploadPdf = asyncHandler(async (req, res) => {
  const document = await uploadDocument(
    req.user.id,
    req.file
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      document,
      "Document uploaded successfully."
    )
  );
});

export const getDocuments = asyncHandler(async (req, res) => {
  const documents = await getUserDocuments(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      documents,
      "Documents fetched successfully."
    )
  );
});

export const getDocument = asyncHandler(async (req, res) => {
  const document = await getDocumentById(
    req.user.id,
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      document,
      "Document fetched successfully."
    )
  );
});

export const removeDocument = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  
  await deleteDocument(
    req.user.id,
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Document deleted successfully."
    )
  );
});