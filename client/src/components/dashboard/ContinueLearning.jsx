import {
  FileText,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContinueLearning({ document }) {
  if (!document) {
    return (
      <section className="mt-8 sm:mt-12">
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500">
            Continue Learning
          </h2>
        </div>

        <div className="rounded-xl border border-dashed border-white/10 bg-zinc-900 p-8 text-center">
          <FileText
            size={40}
            className="mx-auto mb-4 text-zinc-600"
            strokeWidth={1.5}
          />

          <h3 className="text-lg font-serif text-[#FDFBF7]">
            No documents yet
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Upload your first PDF to start learning.
          </p>

          <Link
            to="/documents"
            className="mt-6 inline-flex rounded-lg bg-[#C9A44C] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#D4B86A]"
          >
            Upload PDF
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 sm:mt-12">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500">
          Continue Learning
        </h2>

        <Link
          to="/documents"
          className="text-xs font-mono text-[#C9A44C] transition-colors hover:text-[#D4B86A]"
        >
          View All
        </Link>
      </div>

      <Link
        to={`/documents/${document._id}`}
        className="group flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/80"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="rounded-lg bg-[#C9A44C]/10 p-2 text-[#C9A44C]">
            <FileText size={18} strokeWidth={1.5} />
          </div>

          <div className="min-w-0">
            <h4 className="truncate font-serif text-[#FDFBF7]">
              {document.title}
            </h4>

            <p className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
              <Clock size={12} />
              Last updated{" "}
              <span className="text-zinc-400">
                {new Date(document.updatedAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium font-mono text-[#C9A44C] opacity-0 transition-all group-hover:opacity-100">
          <span>Continue</span>

          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </section>
  );
}