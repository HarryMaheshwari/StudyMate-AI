import { FileText, Trash2 } from "lucide-react";
import useDeleteDocument from "../../hooks/useDeleteDocument";
import { Link } from "react-router-dom";

export default function DocumentCard({ document }) {
  const deleteMutation = useDeleteDocument();

  const handleDelete = (e) => {
    // Prevents the Link from navigating and stops the event from bubbling up
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Delete this document?")) {
      deleteMutation.mutate(document._id);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <Link to={`/documents/${document._id}`} className="block">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <FileText className="text-red-500" size={28} />
          </div>

          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="text-zinc-500 hover:text-red-500 transition cursor-pointer"
            aria-label="Delete document"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <h3 className="truncate text-lg font-semibold">{document.title}</h3>

        <p className="mt-2 text-sm text-zinc-500">
          {(document.fileSize / 1024 / 1024).toFixed(2)} MB
        </p>

        <span className="mt-5 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
          {document.status}
        </span>
      </Link>
    </div>
  );
}