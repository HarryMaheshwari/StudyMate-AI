import { useState, useMemo } from "react";
import {
  Sparkles,
  Upload,
  NotebookPen,
 Brain,
  ClipboardCheck,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function WelcomeBanner({dashboard}) {

   const {
    documents = 0,
    notes = 0,
    flashcards = 0,
    quizzes = 0,
    continueLearning,
  } = dashboard || {};

  const nextAction = (() => {
  if (documents === 0) {
    return {
      title: "Upload your first PDF",
      description:
        "Start by uploading a document so StudyMate can generate notes, quizzes and flashcards.",
      icon: Upload,
      to: "/upload",
      button: "Upload PDF",
    };
  }

  if (notes === 0) {
    return {
      title: "Generate AI Notes",
      description:
        "Transform your uploaded document into structured notes.",
      icon: NotebookPen,
      to: "/notes",
      button: "Generate Notes",
    };
  }

  if (flashcards === 0) {
    return {
      title: "Create Flashcards",
      description:
        "Memorize important concepts using AI flashcards.",
      icon: Brain,
      to: "/flashcards",
      button: "Create Flashcards",
    };
  }

  if (quizzes === 0) {
    return {
      title: "Test Your Knowledge",
      description:
        "Generate an AI quiz to reinforce your learning.",
      icon: ClipboardCheck,
      to: "/quiz",
      button: "Start Quiz",
    };
  }

  return {
    title: "Continue Learning",
    description:
      continueLearning?.title ||
      "Resume your latest study session.",
    icon: MessageSquare,
    to: continueLearning
      ? `/documents/${continueLearning._id}`
      : "/documents",
    button: "Continue",
  };
})();

 const { data: user } = useAuth();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  })();

  const userName = user?.fullName?.split(" ")[0] || "Scholar";


  const totalResources =
    documents + notes + flashcards + quizzes;

  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-zinc-950 p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300 text-zinc-900 tracking-tighter">
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
         <div className="lg:col-span-5 w-full">
  <div className="lg:col-span-5">
  <div className="rounded-[2rem] border border-zinc-200 bg-[#FDFBF7] p-8 shadow-2xl">

    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-[#C9A44C]/10 p-3">
        <nextAction.icon
          size={22}
          className="text-[#C9A44C]"
        />
      </div>

      <div>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
          AI Recommendation
        </p>

        <h3 className="mt-1 font-serif text-xl font-semibold">
          {nextAction.title}
        </h3>
      </div>
    </div>

    <p className="mt-6 leading-relaxed text-zinc-600">
      {nextAction.description}
    </p>

    <Link
      to={nextAction.to}
      className="mt-8 flex items-center justify-between rounded-xl bg-zinc-900 px-5 py-4 text-white transition hover:bg-black"
    >
      <span>{nextAction.button}</span>

      <ArrowRight size={18} />
    </Link>

    {continueLearning && (
      <div className="mt-8 border-t border-zinc-200 pt-6">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
          Last Studied
        </p>

        <h4 className="mt-2 font-medium">
          {continueLearning.title}
        </h4>

        <p className="mt-1 text-sm text-zinc-500">
          Updated{" "}
          {new Date(
            continueLearning.updatedAt
          ).toLocaleDateString()}
        </p>
      </div>
    )}
  </div>
</div>
</div>
        </div>

      </div>
    </section>
  );
}