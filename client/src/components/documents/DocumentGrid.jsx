import useDocuments from "../../hooks/useDocuments";
import DocumentCard from "./DocumentCard";

export default function DocumentGrid() {
  const { data: documents, isLoading } = useDocuments();

  if (isLoading) {
    return (
      <div className="text-zinc-400">
        Loading documents...
      </div>
    );
  }

  if (!documents?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-700 p-12 text-center">

        <h2 className="text-2xl font-semibold">
          No Documents Yet
        </h2>

        <p className="mt-3 text-zinc-500">
          Upload your first PDF to start learning.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {documents.map((doc) => (
        <DocumentCard
          key={doc._id}
          document={doc}
        />
      ))}

    </div>
  );
}