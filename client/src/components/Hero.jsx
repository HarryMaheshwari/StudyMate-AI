import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[90vh] w-full bg-[#050505] text-white pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Value Proposition */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            v2.0 Beta • Real-time AI processing
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[0.9] tracking-tighter uppercase"
          >
            Your Knowledge, <br />
            <span className="text-white/40">Architected.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl font-light max-w-lg leading-relaxed"
          >
            Upload raw documents. Our engine extracts, tags, and creates a queryable neural-map of your coursework. Stop memorizing; start retrieving.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 pt-4"
          >
            <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-neutral-200 transition-all">
              Initialize Study Session
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white/10 transition-all">
              See Engine Docs
            </button>
          </motion.div>
        </div>

        {/* Right: The App Interface "Snippet" */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative group bg-[#0a0a0a] border border-white/10 rounded-3xl p-1 shadow-2xl"
        >
          {/* Interface Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="ml-4 text-[10px] font-mono text-white/30">STUDYMATE_CORE_V2.exe</div>
          </div>

          {/* Interface Body */}
          <div className="p-8 space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/20 flex items-center justify-center font-bold">PDF</div>
              <div className="space-y-1">
                <div className="text-sm font-bold">Quantum_Physics_101.pdf</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">482 Pages • 24.5 MB</div>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50">
                <span>Task Processing</span>
                <span className="text-emerald-400">Complete</span>
              </div>
              {["Extracting text vectors", "Mapping knowledge graph", "Generating flashcard set", "Syncing to workspace"].map((task, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-white/70 font-mono">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}