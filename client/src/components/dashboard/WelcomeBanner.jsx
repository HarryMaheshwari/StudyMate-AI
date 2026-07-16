import { Sparkles, CheckCircle2, Circle } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function WelcomeBanner() {
  const { data: user } = useAuth();
  
  const tasks = [
    { id: 1, label: 'Upload DBMS Notes', completed: true },
    { id: 2, label: 'Generate Quiz', completed: true },
    { id: 3, label: 'Review Flashcards', completed: false },
    { id: 4, label: 'Create AI Summary', completed: false },
  ];

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = (completedCount / totalCount) * 100;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.fullName?.split(' ')[0] || 'Scholar';

  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-zinc-950 p-4 sm:p-8 lg:p-12 shadow-2xl">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-[#C9A44C]/5 rounded-full blur-[120px] -mr-20 -mt-20" />

      <div className="relative z-10">
        {/* Header - Full width on mobile */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A44C]">
            <Sparkles size={12} />
            <span className="hidden sm:inline">Nexus Intelligence</span>
            <span className="sm:hidden">AI</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FDFBF7] tracking-tight leading-[1.1]">
            {greeting()}, {userName}
          </h1>
          
          <p className="mt-2 sm:mt-6 text-zinc-400 text-sm sm:text-[15px] leading-relaxed max-w-md">
            Turn your notes into summaries, flashcards, quizzes, and AI conversations—all in one place.
          </p>
        </div>

        {/* Tasks Card - Full width on mobile, no extra stats */}
        <div className="w-full">
          <div className="bg-[#FDFBF7] text-zinc-950 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="font-serif text-sm font-bold">Today's Goal</h3>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 sm:px-3 py-1 rounded-full">
                {completedCount}/{totalCount}
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium ${
                    task.completed ? 'text-zinc-900' : 'text-zinc-500'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 size={14} className="text-[#C9A44C] flex-shrink-0 sm:w-4 sm:h-4" />
                  ) : (
                    <Circle size={14} className="text-zinc-300 flex-shrink-0 sm:w-4 sm:h-4" />
                  )}
                  <span className={task.completed ? 'line-through decoration-[#C9A44C]' : ''}>
                    {task.label}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1 sm:mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C9A44C] transition-all duration-1000"
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