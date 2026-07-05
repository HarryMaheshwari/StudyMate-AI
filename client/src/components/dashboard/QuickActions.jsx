import { Link } from "react-router-dom";
import {
  Upload,
  FileText,
  Brain,
} from "lucide-react";

const actions = [
  {
    title: "Upload PDF",
    description: "Upload your study material",
    icon: Upload,
    color: "bg-blue-600",
    to: "/upload",
  },
  {
    title: "AI Notes",
    description: "View generated notes",
    icon: FileText,
    color: "bg-emerald-600",
    to: "/notes",
  },
  {
    title: "Generate Quiz",
    description: "Practice your knowledge",
    icon: Brain,
    color: "bg-violet-600",
    to: "/quiz",
  },
];

export default function QuickActions() {
  return (
    <section>

      <h2 className="mb-6 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-zinc-700"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-xl font-semibold">
                {action.title}
              </h3>

              <p className="mt-2 text-zinc-400">
                {action.description}
              </p>

              <div className="mt-6 text-sm font-medium text-blue-400 opacity-0 transition-all group-hover:opacity-100">
                Open →
              </div>
            </Link>
          );
        })}

      </div>

    </section>
  );
}