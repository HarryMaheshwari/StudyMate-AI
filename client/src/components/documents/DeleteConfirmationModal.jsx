import { Loader2, AlertTriangle } from "lucide-react";

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isDeleting, docTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-[2px] animate-in fade-in duration-200">
      {/* Container: Sharp edges, high-end technical feel */}
      <div className="bg-[#09090b] border border-[#27272a] w-full max-w-[360px] p-6 rounded-md shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Warning Indicator */}
        <div className="mb-4">
          <AlertTriangle size={24} className="text-[#C9A44C]" strokeWidth={1.5} />
        </div>

        <h3 className="text-sm font-semibold text-white mb-2">Delete document?</h3>
        <p className="text-xs text-zinc-400 leading-relaxed mb-8">
          You are about to delete <span className="text-zinc-100">"{docTitle}"</span>. This action is permanent and cannot be undone.
        </p>
        
        {/* Action Row */}
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-[#18181b] text-zinc-300 hover:bg-[#27272a] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-[#C9A44C] text-zinc-950 hover:bg-[#b08d3c] transition-all flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Processing
              </>
            ) : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}