import { Link } from "react-router-dom";
import { Plus, FileText, BookOpen, Brain, MessageSquare, Sparkles } from "lucide-react";
import useDocuments from "../../hooks/useDocuments";
import DocumentCard from "./DocumentCard";

export default function DocumentGrid() {
  const { data: documents, isLoading } = useDocuments();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 rounded-lg bg-zinc-900/50 animate-pulse" />
        ))}
      </div>
    );
  }

  // EMPTY STATE
  if (!documents?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        {/* Main CTA Area */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800">
            <FileText size={28} className="text-zinc-500" />
          </div>
          <h3 className="text-white font-medium text-xl mb-2">No documents yet</h3>
          <p className="text-zinc-400 text-sm max-w-xs mb-8">
            Upload your first PDF and let AI handle your study notes, quizzes, and summaries.
          </p>
          <Link 
            to="/upload" 
            className="inline-flex items-center gap-2 bg-[#C9A44C] text-zinc-950 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b08d3c] transition-all active:scale-95"
          >
            <Plus size={16} /> Upload PDF
          </Link>
        </div>

        {/* Feature Grid - Fully Responsive */}
        <div className="w-full max-w-2xl border-t border-zinc-800 pt-10">
          <p className="text-xs text-zinc-600 uppercase tracking-widest text-center mb-6">What you can do</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: BookOpen, label: "Notes" },
              { icon: Brain, label: "Flashcards" },
              { icon: MessageSquare, label: "Chat" },
              { icon: Sparkles, label: "Quiz" }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <f.icon size={20} className="text-zinc-400" />
                <span className="text-[11px] font-medium text-zinc-500">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // LIBRARY VIEW
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {documents.length} {documents.length === 1 ? 'document' : 'documents'}
        </span>
        <Link 
          to="/upload" 
          className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A44C] hover:text-[#b08d3c] transition-colors"
        >
          <Plus size={14} /> Upload
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <DocumentCard 
            key={doc._id} 
            doc={doc} 
            isNew={new Date() - new Date(doc.createdAt) < 86400000} 
          />
        ))}
      </div>
    </div>
  );
}