import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Trash2, Loader2, FileText, Clock, BookOpen, 
  ChevronDown, Share2, AlertCircle, CheckCircle,
  ZoomIn, ZoomOut, RotateCcw, X
} from "lucide-react";
import useDeleteNotes from "../hooks/useDeleteNotes";
import DashboardLayout from "../layouts/DashboardLayout";
import useNotes from "../hooks/useNotes";
import { useState } from "react";

export default function Notes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(100);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: note, isLoading } = useNotes(id);
  const deleteMutation = useDeleteNotes();

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        navigate(`/documents/${id}`);
      }
    });
  };

  const zoomIn = () => {
    if (fontSize < 175) setFontSize(fontSize + 10);
  };

  const zoomOut = () => {
    if (fontSize > 60) setFontSize(fontSize - 10);
  };

  const resetZoom = () => {
    setFontSize(100);
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
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 bg-zinc-950 rounded-4xl">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => navigate(`/documents/${id}`)} 
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm group"
          >
            <ArrowLeft size={30} className="group-hover:-translate-x-0.5 transition-transform" />
          
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {note?.title || "Study Notes"}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {note?.createdAt ? new Date(note.createdAt).toLocaleDateString() : "Today"}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="flex items-center gap-1.5">
                  <FileText size={14} />
                  {note?.content?.split(/\s+/).length || 0} words
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle size={14} />
                  Ready
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-[#121212] border border-[#1f1f1f] rounded-xl p-1">
                <button
                  onClick={zoomOut}
                  disabled={fontSize <= 60}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs text-zinc-500 min-w-[36px] text-center">
                  {fontSize}%
                </span>
                <button
                  onClick={zoomIn}
                  disabled={fontSize >= 175}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={resetZoom}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              <button
                onClick={() => navigator.share?.({ title: note?.title, text: note?.content })}
                className="p-2.5 rounded-xl bg-[#121212] border border-[#1f1f1f] text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                title="Share"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2.5 rounded-xl bg-[#121212] border border-[#1f1f1f] text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Notes Content */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            {/* Content Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#1f1f1f] bg-[#0D0D0D]">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Notes
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-600">
                  {note?.content?.split(/\s+/).length || 0} words
                </span>
                <span className="text-[10px] text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded">
                  {fontSize}%
                </span>
              </div>
            </div>

            {/* Markdown Content with Zoom */}
            <div className="p-6 sm:p-8 lg:p-10 overflow-auto">
              <div 
                className="transition-all duration-200 origin-top-left"
                style={{ 
                  transform: `scale(${fontSize / 100})`,
                  width: `${100 / (fontSize / 100)}%`
                }}
              >
                <article className="
                  prose 
                  prose-invert 
                  prose-zinc 
                  max-w-none
                  prose-headings:text-white
                  prose-headings:font-bold
                  prose-h1:text-3xl sm:prose-h1:text-4xl
                  prose-h1:mb-6
                  prose-h2:text-2xl sm:prose-h2:text-3xl
                  prose-h2:mt-8
                  prose-h2:mb-4
                  prose-h3:text-xl sm:prose-h3:text-2xl
                  prose-h3:mt-6
                  prose-h3:mb-3
                  prose-h4:text-lg
                  prose-h4:mt-4
                  prose-h4:mb-2
                  prose-p:text-zinc-300
                  prose-p:leading-[1.8]
                  prose-p:mb-4
                  prose-a:text-[#C9A44C]
                  prose-a:no-underline
                  prose-a:hover:underline
                  prose-a:font-medium
                  prose-strong:text-white
                  prose-strong:font-semibold
                  prose-ul:text-zinc-300
                  prose-ul:space-y-1.5
                  prose-ul:my-4
                  prose-ol:text-zinc-300
                  prose-ol:space-y-1.5
                  prose-ol:my-4
                  prose-li:text-zinc-300
                  prose-li:marker:text-[#C9A44C]
                  prose-li:leading-[1.8]
                  prose-blockquote:border-l-4
                  prose-blockquote:border-[#C9A44C]
                  prose-blockquote:text-zinc-400
                  prose-blockquote:bg-zinc-800/30
                  prose-blockquote:px-6
                  prose-blockquote:py-3
                  prose-blockquote:rounded-r-lg
                  prose-blockquote:my-4
                  prose-blockquote:not-italic
                  prose-code:text-[#C9A44C]
                  prose-code:bg-zinc-800
                  prose-code:px-1.5
                  prose-code:py-0.5
                  prose-code:rounded
                  prose-code:text-sm
                  prose-code:font-mono
                  prose-pre:bg-[#0D0D0D]
                  prose-pre:border
                  prose-pre:border-zinc-800
                  prose-pre:rounded-xl
                  prose-pre:p-5
                  prose-pre:overflow-x-auto
                  prose-pre:my-4
                  prose-pre:text-sm
                  prose-img:rounded-xl
                  prose-img:border
                  prose-img:border-zinc-800
                  prose-img:my-6
                  prose-hr:border-zinc-800
                  prose-hr:my-8
                  prose-table:text-zinc-300
                  prose-table:w-full
                  prose-table:text-sm
                  prose-table:my-4
                  prose-th:text-white
                  prose-th:border-zinc-800
                  prose-th:bg-zinc-800/30
                  prose-th:px-4
                  prose-th:py-2.5
                  prose-th:text-left
                  prose-th:font-semibold
                  prose-td:border-zinc-800
                  prose-td:px-4
                  prose-td:py-2.5
                  prose-td:align-top
                ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {note?.content || "No content available"}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500">
            <span>
              Generated on {note?.createdAt ? new Date(note.createdAt).toLocaleString() : "Today"}
            </span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigator.share?.({ title: note?.title, text: note?.content })}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Share2 size={14} />
                Share
              </button>
              <span className="text-zinc-700">|</span>
              <button 
                onClick={() => navigate(`/documents/${id}`)}
                className="text-[#C9A44C] hover:text-[#D4B45C] transition-colors flex items-center gap-1.5"
              >
                Back to Document
                <ChevronDown size={14} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl max-w-md w-full p-6 shadow-2xl">
                {/* Close button */}
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Trash2 size={28} className="text-red-400" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  Delete Notes?
                </h3>
                
                {/* Description */}
                <p className="text-sm text-zinc-400 text-center mb-6">
                  Are you sure you want to delete the notes "{note?.title}"? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {deleteMutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}