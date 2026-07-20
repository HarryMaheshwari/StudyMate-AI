export const processChunks = async (
  chunks,
  worker,
  concurrency = 3,
  onChunkComplete = () => {}
) => {
  const results = [];
  let index = 0;
  let completed = 0;

  async function run() {
    while (index < chunks.length) {
      const currentIndex = index++;

      results[currentIndex] = await worker(
        chunks[currentIndex],
        currentIndex
      );

      completed++;

      onChunkComplete(completed, chunks.length);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, chunks.length) },
    run
  );

  await Promise.all(workers);

  return results;
};