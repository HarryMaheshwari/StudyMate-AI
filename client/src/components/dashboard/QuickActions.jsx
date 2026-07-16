import { Link } from "react-router-dom";
import { Upload, FileText, Brain } from "lucide-react";

const actions = [
  {
    title: "Upload PDF",
    description: "Upload your study material",
    icon: Upload,
    to: "/upload",
  },
  {
    title: "AI Notes",
    description: "View generated notes",
    icon: FileText,
    to: "/notes",
  },
  {
    title: "Generate Quiz",
    description: "Practice your knowledge",
    icon: Brain,
    to: "/quiz",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-8 sm:mt-0">
      <h2 className="mb-4 sm:mb-6 text-xl tracking-tight sm:text-xl font-serif font-bold text-[#000000]">
        Quick Actions
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.to}
              className="flex-1 group flex items-center gap-4 p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:border-white/10 transition-all hover:bg-zinc-900/80"
            >
              <div className="p-2 bg-white/5 rounded-xl text-[#C9A44C]">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-serif font-bold text-[#FDFBF7]">
                  {action.title}
                </h3>
                <p className="text-xs text-zinc-400">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}