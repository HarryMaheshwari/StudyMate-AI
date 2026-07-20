import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  Brain,
  MessageSquare,
  BookOpen,
  Sparkles,
  Loader2,
  ArrowLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Zap,
  Layers,
  Target,
  TrendingUp,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useDocument from "../hooks/useDocument";
import useGenerateNotes from "../hooks/useGenerateNotes";
import useNotes from "../hooks/useNotes";
import useFlashcards from "../hooks/useFlashcards";
import useGenerateFlashcards from "../hooks/useGenerateFlashcards";
import useQuiz from "../hooks/useQuiz";
import useGenerateQuiz from "../hooks/useGenerateQuiz";
import { useState } from "react";
import { useNotesProgress } from "../hooks/useNotesProgress";

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: document, isLoading } = useDocument(id);
  const { data: note, isSuccess: notesExist } = useNotes(id);
  const generateNotesMutation = useGenerateNotes();

  const [trackNotesProgress, setTrackNotesProgress] = useState(false);

  // ✅ Renamed progress to notesProgress to avoid conflict with page progress
  const {
    progress: notesProgress,
    stage,
  } = useNotesProgress(id, trackNotesProgress);

  const { isSuccess: flashcardsExist } = useFlashcards(id);
  const generateFlashcardsMutation = useGenerateFlashcards();
  const { isSuccess: quizExists } = useQuiz(id);
  const generateQuizMutation = useGenerateQuiz();

  const handleAction = (callback) => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
    callback();
  };

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="flex h-screen items-center justify-center bg-zinc-900">
          <Loader2 className="animate-spin text-zinc-500" size={28} />
        </div>
      </DashboardLayout>
    );

  const getStatusColor = (status) => {
    if (!status) return "text-zinc-400 bg-zinc-800";
    const s = status.toLowerCase();
    if (s === "ready" || s === "completed")
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (s === "processing")
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-zinc-400 bg-zinc-800";
  };

  // Calculate useful stats
  const totalItems =
    (notesExist ? 1 : 0) + (flashcardsExist ? 1 : 0) + (quizExists ? 1 : 0);
  // ✅ This is the page's overall study progress - leave as is
  const progress = Math.round((totalItems / 3) * 100);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-zinc-950 rounded-none md:rounded-4xl">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-none md:rounded-t-4xl">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => handleAction(() => navigate("/documents"))}
                className="p-2 -ml-2 hover:bg-zinc-800 active:bg-zinc-700 rounded-full transition-colors duration-200"
              >
                <ArrowLeft size={20} className="text-zinc-400" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-xl lg:text-2xl font-semibold text-white truncate">
                  {document?.title || "Untitled Document"}
                </h1>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(document?.status)}`}
            >
              {document?.status || "Draft"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {/* Stats - Useful ones */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Layers size={14} className="text-[#C9A44C]" />
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  Study Materials
                </p>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {totalItems}/3
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                Notes • Flashcards • Quiz
              </p>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-emerald-400" />
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  Progress
                </p>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {progress}%
              </p>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#C9A44C] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Target size={14} className="text-purple-400" />
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  Status
                </p>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {document?.status || "Draft"}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                {document?.createdAt
                  ? new Date(document.createdAt).toLocaleDateString()
                  : "Today"}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ActionCard
                icon={<BookOpen size={18} />}
                title="Study Notes"
                description="Generate comprehensive notes"
                exists={notesExist}
                isPending={generateNotesMutation.isPending}
               onGenerate={() =>
  handleAction(() => {
    setTrackNotesProgress(true);

    generateNotesMutation.mutate(id, {
      onSettled: () => {
        setTrackNotesProgress(false);
      },
    });
  })
}
                onView={() =>
                  handleAction(() => navigate(`/documents/${id}/notes`))
                }
                color="emerald"
              />
              <ActionCard
                icon={<Brain size={18} />}
                title="Flashcards"
                description="Create study cards"
                exists={flashcardsExist}
                isPending={generateFlashcardsMutation.isPending}
                onGenerate={() =>
                  handleAction(() => generateFlashcardsMutation.mutate(id))
                }
                onView={() =>
                  handleAction(() => navigate(`/documents/${id}/flashcards`))
                }
                color="purple"
              />
              <ActionCard
                icon={<Sparkles size={18} />}
                title="AI Quiz"
                description="Test your knowledge"
                exists={quizExists}
                isPending={generateQuizMutation.isPending}
                onGenerate={() =>
                  handleAction(() => generateQuizMutation.mutate(id))
                }
                onView={() =>
                  handleAction(() => navigate(`/documents/${id}/quiz`))
                }
                color="gold"
              />
              <ActionCard
                icon={<MessageSquare size={18} />}
                title="Chat with PDF"
                description="Ask questions about content"
                isChat
                onView={() =>
                  handleAction(() => navigate(`/documents/${id}/chat`))
                }
                color="blue"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#121212] rounded-xl sm:rounded-2xl border border-[#1f1f1f] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Recent Activity
              </h3>
              <span className="text-[10px] text-zinc-600">Last 7 days</span>
            </div>
            <div className="space-y-3">
              <ActivityItem
                label="Document uploaded"
                date={
                  document?.createdAt
                    ? new Date(document.createdAt).toLocaleDateString()
                    : "Today"
                }
                isComplete={true}
              />
              {notesExist && (
                <ActivityItem
                  label="Study notes generated"
                  date="Today"
                  isComplete={true}
                />
              )}
              {flashcardsExist && (
                <ActivityItem
                  label="Flashcards created"
                  date="Today"
                  isComplete={true}
                />
              )}
              {quizExists && (
                <ActivityItem
                  label="AI Quiz generated"
                  date="Today"
                  isComplete={true}
                />
              )}
              {!notesExist && !flashcardsExist && !quizExists && (
                <div className="text-center py-3">
                  <p className="text-zinc-500 text-sm">No activity yet</p>
                  <p className="text-zinc-600 text-xs mt-1">
                    Generate notes, flashcards, or quiz to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {trackNotesProgress && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-[420px]">
            <h2 className="text-xl font-semibold text-white">
              Generating Notes
            </h2>

            <p className="text-zinc-400 mt-2 capitalize">
              {stage}
            </p>

            <div className="w-full h-3 bg-zinc-800 rounded-full mt-6 overflow-hidden">
              <div
                className="h-full bg-[#C9A44C] transition-all duration-300"
                style={{
                  // ✅ Using notesProgress for the generation progress bar
                  width: `${notesProgress}%`,
                }}
              />
            </div>

            <div className="flex justify-between mt-3">
              <span className="text-zinc-500 text-sm">
                {/* ✅ Using notesProgress for the percentage display */}
                {notesProgress}%
              </span>

              <Loader2
                className="animate-spin text-[#C9A44C]"
                size={18}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function ActionCard({
  icon,
  title,
  description,
  exists,
  isPending,
  onGenerate,
  onView,
  isChat,
  color,
}) {
  const colors = {
    emerald: "hover:border-emerald-500/30",
    purple: "hover:border-purple-500/30",
    gold: "hover:border-[#C9A44C]/30",
    blue: "hover:border-blue-500/30",
  };

  const status = isChat ? "Available" : exists ? "Ready" : "Not Generated";
  const statusColor = exists
    ? "text-emerald-400 bg-emerald-500/10"
    : isChat
      ? "text-blue-400 bg-blue-500/10"
      : "text-zinc-500 bg-zinc-800";

  return (
    <div
      className={`bg-[#121212] border border-[#1f1f1f] rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:border-zinc-700 ${colors[color]} active:scale-[0.98]`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="text-zinc-500">{icon}</div>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor}`}
          >
            {status}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-0.5">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 mb-3 sm:mb-4">{description}</p>
        </div>

        <button
          onClick={isChat || exists ? onView : onGenerate}
          disabled={isPending}
          className={`
            w-full py-2.5 rounded-xl text-xs sm:text-sm font-medium 
            transition-all duration-200 flex items-center justify-center gap-2
            ${
              isChat || exists
                ? "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white"
                : "bg-[#C9A44C] hover:bg-[#D4B45C] text-[#09090B]"
            }
            ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            active:scale-[0.97]
          `}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>{isChat || exists ? "View" : "Generate"}</span>
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ActivityItem({ label, date, isComplete }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-3">
        {isComplete ? (
          <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
        ) : (
          <div className="w-3.5 h-3.5 rounded-full border border-zinc-700" />
        )}
        <span className="text-sm text-zinc-300">{label}</span>
      </div>
      <span className="text-xs text-zinc-500">{date}</span>
    </div>
  );
}