import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import useDocument from "../hooks/useDocument";
import useGenerateNotes from "../hooks/useGenerateNotes";
import useNotes from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";



export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: document, isLoading } = useDocument(id);
  const {
  data: note,
  isSuccess,
} = useNotes(id);
  const generateNotesMutation = useGenerateNotes();

  if (isLoading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            {document.title}
          </h1>

          <p className="mt-2 text-zinc-400">
            Uploaded study material
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
    <p className="text-sm text-zinc-500">
      Status
    </p>

    <h3 className="mt-2 text-xl font-semibold capitalize">
      {document.status}
    </h3>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
    <p className="text-sm text-zinc-500">
      File Size
    </p>

    <h3 className="mt-2 text-xl font-semibold">
      {(document.fileSize / 1024 / 1024).toFixed(2)} MB
    </h3>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
    <p className="text-sm text-zinc-500">
      Uploaded
    </p>

    <h3 className="mt-2 text-xl font-semibold">
      {new Date(document.createdAt).toLocaleDateString()}
    </h3>
  </div>

</div>

<div className="grid gap-6 md:grid-cols-3">

 {isSuccess ? (
  <button
    onClick={() => navigate(`/documents/${id}/notes`)}
    className="rounded-2xl bg-emerald-600 p-5 font-semibold hover:bg-emerald-500"
  >
    View Notes
  </button>
) : (
  <button
    onClick={() => generateNotesMutation.mutate(id)}
    disabled={generateNotesMutation.isPending}
    className="rounded-2xl bg-blue-600 p-5 font-semibold hover:bg-blue-500"
  >
    {generateNotesMutation.isPending
      ? "Generating..."
      : "Generate Notes"}
  </button>
)}

  <button className="rounded-2xl bg-violet-600 p-5 font-semibold hover:bg-violet-500">
    Generate Flashcards
  </button>

  <button className="rounded-2xl bg-emerald-600 p-5 font-semibold hover:bg-emerald-500">
    Generate Quiz
  </button>

</div>

      </div>

    </DashboardLayout>
  );
}