import { FileText, NotebookPen, Brain, Flame } from "lucide-react";

export default function StatsCards({
  documents,
  notes,
  quizzes,
  streak,
}) {
const stats = [
  {
    title: "Documents",
    value: documents,
    sub:
      documents > 0
        ? `${documents} uploaded`
        : "Upload your first PDF",
    icon: FileText,
  },
  {
    title: "AI Notes",
    value: notes,
    sub:
      notes > 0
        ? `${notes} generated`
        : "Generate notes",
    icon: NotebookPen,
  },
  {
    title: "Quizzes",
    value: quizzes,
    sub:
      quizzes > 0
        ? `${quizzes} available`
        : "Generate your first quiz",
    icon: Brain,
  },
  {
    title: "Study Streak",
    value: `${streak} Day${streak === 1 ? "" : "s"}`,
    sub:
      streak > 0
        ? "Keep it up!"
        : "Start learning today",
    icon: Flame,
  },
];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border border-white/5 bg-zinc-900 p-4 transition-colors hover:border-white/10 sm:p-6"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
            {item.title}
          </p>

          <h2 className="mt-3 text-3xl font-serif font-bold text-[#FDFBF7]">
            {item.value}
          </h2>

          <p className="mt-2 text-[11px] font-mono text-[#C9A44C]">
            {item.sub}
          </p>
        </div>
      ))}
    </section>
  );
}