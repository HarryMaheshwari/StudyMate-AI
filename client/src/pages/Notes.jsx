import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Trash2, Loader2, FileText, Clock, BookOpen, 
  ChevronDown, Download, Printer, Share2, AlertCircle 
} from "lucide-react";
import useDeleteNotes from "../hooks/useDeleteNotes";
import DashboardLayout from "../layouts/DashboardLayout";
import useNotes from "../hooks/useNotes";

export default function Notes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: note, isLoading } = useNotes(id);
  const deleteMutation = useDeleteNotes();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete these notes?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
          <Loader2 className="animate-spin text-zinc-500" size={32} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          {/* Back Button with animation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/documents/${id}`)} 
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 sm:mb-6 text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Document</span>
          </motion.button>

          {/* Header Section with animation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-[#C9A44C]/10">
                  <BookOpen size={20} className="text-[#C9A44C]" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {note?.title || "Study Notes"}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {note?.createdAt ? new Date(note.createdAt).toLocaleDateString() : "Today"}
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText size={14} />
                  {note?.content?.split(/\s+/).length || 0} words
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                onClick={() => navigator.share?.({ title: note?.title, text: note?.content })}
              >
                <Share2 size={18} />
              </motion.button>

              {/* Delete Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 whitespace-nowrap
                  ${deleteMutation.isPending 
                    ? 'bg-red-500/20 text-red-400 cursor-not-allowed' 
                    : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                  }
                `}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Notes Content with animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#121212] border border-[#1f1f1f] rounded-xl sm:rounded-2xl overflow-hidden"
          >
            {/* Content Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#1f1f1f] bg-[#0D0D0D]">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <FileText size={14} />
                <span>Content</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-300"
                >
                  <Printer size={14} />
                </button>
                <button 
                  className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-300"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>

            {/* Markdown Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <article className="
                prose 
                prose-invert 
                prose-zinc 
                max-w-none
                prose-headings:text-white
                prose-headings:font-bold
                prose-h1:text-2xl sm:prose-h1:text-3xl
                prose-h2:text-xl sm:prose-h2:text-2xl
                prose-h3:text-lg sm:prose-h3:text-xl
                prose-p:text-zinc-300
                prose-p:leading-relaxed
                prose-p:mb-4
                prose-a:text-[#C9A44C]
                prose-a:no-underline
                prose-a:hover:underline
                prose-a:font-medium
                prose-strong:text-white
                prose-ul:text-zinc-300
                prose-ul:space-y-1
                prose-ol:text-zinc-300
                prose-ol:space-y-1
                prose-li:text-zinc-300
                prose-li:marker:text-[#C9A44C]
                prose-blockquote:border-l-[#C9A44C]
                prose-blockquote:text-zinc-400
                prose-blockquote:bg-zinc-800/50
                prose-blockquote:px-4
                prose-blockquote:py-2
                prose-blockquote:rounded-r-lg
                prose-code:text-[#C9A44C]
                prose-code:bg-zinc-800
                prose-code:px-1.5
                prose-code:py-0.5
                prose-code:rounded
                prose-code:text-sm
                prose-code:font-mono
                prose-pre:bg-[#0D0D0D]
                prose-pre:border
                prose-pre:border-zinc-700
                prose-pre:rounded-xl
                prose-pre:p-4
                prose-pre:overflow-x-auto
                prose-img:rounded-xl
                prose-img:border
                prose-img:border-zinc-700
                prose-hr:border-zinc-700
                prose-hr:my-6
                prose-table:text-zinc-300
                prose-table:w-full
                prose-th:text-white
                prose-th:border-zinc-700
                prose-th:bg-zinc-800/50
                prose-th:px-3
                prose-th:py-2
                prose-td:border-zinc-700
                prose-td:px-3
                prose-td:py-2
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {note?.content || "No content available"}
                </ReactMarkdown>
              </article>
            </div>
          </motion.div>

          {/* Footer Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
              <p>
                Generated on {note?.createdAt ? new Date(note.createdAt).toLocaleString() : "Today"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.print()}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Printer size={14} />
                <span>Print</span>
              </button>
              <span className="text-zinc-700">|</span>
              <button 
                onClick={() => navigate(`/documents/${id}`)}
                className="text-[#C9A44C] hover:text-[#D4B45C] transition-colors flex items-center gap-1.5"
              >
                <span>Back to Document</span>
                <ChevronDown size={14} className="rotate-[-90deg]" />
              </button>
            </div>
          </motion.div>

          {/* Delete Confirmation Toast (optional) */}
          <AnimatePresence>
            {deleteMutation.isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center gap-3 z-50"
              >
                <AlertCircle size={18} className="text-emerald-400" />
                <p className="text-emerald-400 text-sm font-medium">Notes deleted successfully</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}