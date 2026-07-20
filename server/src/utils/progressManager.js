const progressMap = new Map();

export const setProgress = (
  documentId,
  progress,
  stage = "processing"
) => {
  progressMap.set(documentId.toString(), {
    progress,
    stage,
  });
};

export const getProgress = (documentId) => {
  return (
    progressMap.get(documentId.toString()) || {
      progress: 0,
      stage: "idle",
    }
  );
};

export const clearProgress = (documentId) => {
  progressMap.delete(documentId.toString());
};