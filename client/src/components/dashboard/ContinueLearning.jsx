import { FileText, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContinueLearning() {
  const items = [
    { title: "Operating System", last: "Today at 2:30 PM", status: "in-progress", path: "/notes/os" },
    { title: "Java Unit 5", last: "Yesterday", status: "completed", path: "/notes/java" }
  ];

  return (
    <section className="mt-8 sm:mt-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500">
          Continue Learning
        </h2>
        <Link to="/learning" className="text-xs text-[#C9A44C] hover:text-[#D4B86A] transition-colors font-mono">
          View All
        </Link>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {items.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="group flex items-center justify-between p-3 sm:p-4 bg-zinc-900 border border-white/5 rounded-xl hover:border-white/10 hover:bg-zinc-900/80 transition-all"
          >
            {/* Left: Icon + Content */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className={`flex-shrink-0 p-2 rounded-lg ${
                item.status === 'completed' 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-[#C9A44C]/10 text-[#C9A44C]'
              }`}>
                {item.status === 'completed' 
                  ? <CheckCircle2 size={16} className="sm:w-5 sm:h-5" /> 
                  : <FileText size={16} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
                }
              </div>
              
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-serif font-medium text-[#FDFBF7] truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] font-mono text-zinc-500 flex items-center gap-1.5 mt-0.5">
                  <Clock size={10} className="sm:w-3 sm:h-3" />
                  {item.status === 'completed' ? "Completed" : "Last opened"} 
                  <span className="text-zinc-400">{item.last}</span>
                </p>
              </div>
            </div>

            {/* Right: Action */}
            <div className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-mono font-medium transition-all ${
              item.status === 'completed' 
                ? 'text-zinc-500' 
                : 'text-[#C9A44C] opacity-0 group-hover:opacity-100'
            }`}>
              <span>{item.status === 'completed' ? 'Review' : 'Continue'}</span>
              <ArrowRight size={12} className={item.status === 'completed' ? '' : 'group-hover:translate-x-0.5 transition-transform'} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}