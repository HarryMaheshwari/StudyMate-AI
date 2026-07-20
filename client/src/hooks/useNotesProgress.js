import { useEffect, useState } from "react";

export const useNotesProgress = (
  documentId,
  enabled
) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("idle");

  useEffect(() => {
    if (!enabled || !documentId) return;

    const eventSource = new EventSource(
  `http://localhost:5000/notes/${documentId}/progress`,
  {
    withCredentials: true,
  }
);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setProgress(data.progress);
      setStage(data.stage);

      if (
        data.stage === "completed" ||
        data.stage === "failed"
      ) {
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [documentId, enabled]);

  return {
    progress,
    stage,
  };
};