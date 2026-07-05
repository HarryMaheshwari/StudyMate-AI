export const chunkText = (
  text,
  maxChunkSize = 12000
) => {
  const words = text.split(" ");

  const chunks = [];
  let currentChunk = "";

  for (const word of words) {
    if (
      (currentChunk + " " + word).length >
      maxChunkSize
    ) {
      chunks.push(currentChunk.trim());
      currentChunk = word;
    } else {
      currentChunk += " " + word;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};