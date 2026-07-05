export const processChunks = async (
  chunks,
  worker,
  concurrency = 3
) => {
  const results = [];
  let index = 0;

  async function run() {
    while (index < chunks.length) {
      const currentIndex = index++;
      results[currentIndex] = await worker(
        chunks[currentIndex],
        currentIndex
      );
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, chunks.length) },
    run
  );

  await Promise.all(workers);

  return results;
};