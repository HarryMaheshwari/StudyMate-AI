import DocumentChunk from "../models/documentChunk.model.js";

export const saveDocumentChunks = async (
  userId,
  documentId,
  chunks
) => {
  // Remove old chunks if they exist
  await DocumentChunk.deleteMany({
    owner: userId,
    document: documentId,
  });

  const chunkDocs = chunks.map(
    (content, index) => ({
      owner: userId,
      document: documentId,
      chunkIndex: index,
      content,
    })
  );

  return await DocumentChunk.insertMany(chunkDocs);
};

export const getDocumentChunks = async (
  userId,
  documentId
) => {
  return await DocumentChunk.find({
    owner: userId,
    document: documentId,
  }).sort({
    chunkIndex: 1,
  });
};

export const deleteDocumentChunks = async (
  userId,
  documentId
) => {
  await DocumentChunk.deleteMany({
    owner: userId,
    document: documentId,
  });
};