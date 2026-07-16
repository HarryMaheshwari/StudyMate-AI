import { useState } from "react";
import { FileText, Trash2, Clock, Loader2 } from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import useDeleteDocument from "../../hooks/useDeleteDocument";
import { Link } from "react-router-dom";

export default function DocumentCard({ doc, isNew }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteMutation = useDeleteDocument();

  return (
    <>
      {/* THIS IS YOUR ORIGINAL UI CLASS LIST */}
      <div className="group relative flex flex-col p-5 bg-white/[0.02] border border-white/[0.08] rounded-xl transition-all hover:bg-white/[0.04] hover:border-[#C9A44C]/30">
        
        {/* Top Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FileText className="text-[#C9A44C]" size={18} strokeWidth={1.5} />
            <span className="text-[13px] font-medium text-zinc-300">PDF</span>
            {isNew && (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase tracking-wider">
                New
              </span>
            )}
          </div>

          <button 
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
            className="text-zinc-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Title */}
        <Link to={`/documents/${doc._id}`} className="block flex-grow">
          <h3 className="text-[15px] font-medium text-zinc-100 leading-snug mb-6 hover:text-[#C9A44C] transition-colors">
            {doc.title}
          </h3>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
          <span className="text-[11px] text-zinc-500 font-mono">
            {new Date(doc.createdAt).toLocaleDateString()}
          </span>
          <span className="text-[10px] font-bold text-[#C9A44C] uppercase tracking-wider">
            {doc.status}
          </span>
        </div>
      </div>

      <DeleteConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => deleteMutation.mutate(doc._id, { onSuccess: () => setIsModalOpen(false) })}
        isDeleting={deleteMutation.isPending}
        docTitle={doc.title}
      />
    </>
  );
}