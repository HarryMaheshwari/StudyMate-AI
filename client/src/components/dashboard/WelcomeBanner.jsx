import { useState, useMemo } from "react";
import { Sparkles, CheckCircle2, Circle } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function WelcomeBanner() {
  const { data: user } = useAuth();

  // 1. Stateful tasks so users can interactively check/uncheck them!
  const [tasks, setTasks] = useState([
    { id: 1, label: "Upload DBMS Notes", completed: true },
    { id: 2, label: "Generate Quiz", completed: true },
    { id: 3, label: "Review Flashcards", completed: false },
    { id: 4, label: "Create AI Summary", completed: false },
  ]);

  // 2. Toggle completion handler
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3. Performance-optimized calculations
  const { completedCount, totalCount, progress } = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const total = tasks.length;
    return {
      completedCount: completed,
      totalCount: total,
      progress: total > 0 ? (completed / total) * 100 : 0,
    };
  }, [tasks]);

  // 4. Clean greeting logic
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const userName = user?.fullName?.split(" ")[0] || "Scholar";

  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-zinc-950 p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300">
      {/* Background Glow Ambiance */}
      <div className="absolute -top-20 -right-20 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-[#C9A44C]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 sm:w-[300px] h-48 sm:h-[300px] bg-zinc-800/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Modern 2-Column Responsive Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Greeting & Intro */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A44C] backdrop-blur-sm">
            <Sparkles size={12} className="animate-pulse" />
            <span className="hidden sm:inline">Nexus Intelligence</span>
            <span className="sm:hidden">AI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#FDFBF7] tracking-tight leading-[1.15]">
            {greeting}, <span className="text-[#C9A44C]">{userName}</span>
          </h1>

          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
            Turn your notes into summaries, interactive flashcards, dynamic quizzes, and AI conversations—all in one smart workspace.
          </p>
        </div>

        {/* Right Column: Interactive Tasks Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-[#FDFBF7] text-zinc-950 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 transition-transform duration-300 hover:scale-[1.01]">
            
            {/* Goal Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="space-y-0.5">
                <h3 className="font-serif text-base font-bold text-zinc-900">Today's Goal</h3>
                <p className="text-xs text-zinc-500">Keep up the great momentum!</p>
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                {completedCount}/{totalCount} Done
              </span>
            </div>

            {/* Task Checklist Items */}
            <div className="space-y-2.5 mb-6">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all duration-200 border outline-none focus-visible:ring-2 focus-visible:ring-[#C9A44C]/50 ${
                    task.completed
                      ? "bg-zinc-50 border-zinc-100 text-zinc-400"
                      : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50"
                  }`}
                >
                  <div className="flex-shrink-0 transition-transform duration-150 active:scale-95">
                    {task.completed ? (
                      <CheckCircle2 size={16} className="text-[#C9A44C] fill-[#C9A44C]/10" />
                    ) : (
                      <Circle size={16} className="text-zinc-300 hover:text-zinc-400" />
                    )}
                  </div>
                  <span className={`transition-all duration-200 select-none ${
                    task.completed ? "line-through decoration-[#C9A44C]/50 text-zinc-400" : ""
                  }`}>
                    {task.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Progress Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                <span>Progress</span>
                <span className="text-zinc-900">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
                <div
                  className="h-full bg-[#C9A44C] rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(201,164,76,0.3)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}