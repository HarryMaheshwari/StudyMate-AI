import { FileText, Brain, GraduationCap, Clock } from "lucide-react";

const stats = [
  { title: "Documents", value: 12, icon: FileText },
  { title: "Notes", value: 48, icon: Brain },
  { title: "Quizzes", value: 20, icon: GraduationCap },
  { title: "Hours Studied", value: 52, icon: Clock },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900">
              <Icon className="text-green-500" size={20} />
            </div>
            <h2 className="text-2xl font-bold">{item.value}</h2>
            <p className="text-sm text-zinc-500">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}