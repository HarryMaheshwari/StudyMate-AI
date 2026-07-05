import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useDeleteNotes from "../hooks/useDeleteNotes";
import DashboardLayout from "../layouts/DashboardLayout";
import useNotes from "../hooks/useNotes";

export default function Notes() {
  const { id } = useParams();

  const { data: note, isLoading } = useNotes(id);
  const deleteMutation = useDeleteNotes();

  if (isLoading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">{note.title}</h1>
        <button
  onClick={() => {
    if (window.confirm("Delete these notes?")) {
      deleteMutation.mutate(id);
    }
  }}
  className="mb-6 rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-500"
>
  Delete Notes
</button>

        <article
          className="
            prose
            prose-invert
            prose-zinc
            max-w-none
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </article>
      </div>
    </DashboardLayout>
  );
}
