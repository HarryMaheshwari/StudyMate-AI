import {
  FileText,
  NotebookPen,
  Brain,
  Flame,
} from "lucide-react";

const stats = [
  {
    title: "Documents",
    value: 0,
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "AI Notes",
    value: 0,
    icon: NotebookPen,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Quizzes",
    value: 0,
    icon: Brain,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Study Streak",
    value: "0 Days",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export default function StatsCards() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-zinc-500">
                  {item.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon
                  size={26}
                  className={item.color}
                />
              </div>

            </div>
          </div>
        );
      })}
    </section>
  );
}