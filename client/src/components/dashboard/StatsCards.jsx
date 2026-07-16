import { FileText, NotebookPen, Brain, Flame } from "lucide-react";

const stats = [
  { title: "Documents", value: "12", sub: "+2 uploaded this week", icon: FileText },
  { title: "AI Notes", value: "8", sub: "3 pending review", icon: NotebookPen },
  { title: "Quizzes", value: "0", sub: "Upload a PDF to start", icon: Brain },
  { title: "Study Streak", value: "4 Days", sub: "Keep it up!", icon: Flame },
];

export default function StatsCards() {
  return (
    <section className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div 
            key={item.title} 
            className="p-4 sm:p-6 bg-zinc-900 border border-white/5 rounded-2xl sm:rounded-3xl hover:border-white/10 transition-colors"
          >
            <p className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              {item.title}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#FDFBF7] mt-1 sm:mt-3">
              {item.value}
            </h2>
            <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-[#C9A44C] mt-1 sm:mt-2 font-mono">
              {item.sub}
            </p>
          </div>
        );
      })}
    </section>
  );
}