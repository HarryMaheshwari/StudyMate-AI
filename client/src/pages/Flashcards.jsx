import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  RotateCcw, Shuffle, ChevronLeft, ChevronRight, 
  ArrowLeft, Loader2, BookOpen, Sparkles, CheckCircle,
  LayoutGrid, List, Maximize2
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useFlashcards from "../hooks/useFlashcards";

export default function Flashcards() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFlashcards(id);
  
  const [deck, setDeck] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'list'

  useMemo(() => {
    if (data?.cards) setDeck(data.cards);
  }, [data]);

  const handleNav = (dir) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrent((prev) => Math.max(0, Math.min(prev + dir, deck.length - 1)));
      setIsFlipping(false);
    }, 300);
  };

  const shuffleDeck = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setIsFlipped(false);
    setTimeout(() => {
      setDeck([...deck].sort(() => Math.random() - 0.5));
      setCurrent(0);
      setIsFlipping(false);
    }, 300);
  };

  const restartDeck = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setIsFlipped(false);
    setTimeout(() => {
      setDeck(data.cards);
      setCurrent(0);
      setIsFlipping(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNav(1);
      if (e.key === "ArrowLeft") handleNav(-1);
      if (e.key === " ") { 
        e.preventDefault(); 
        if (!isFlipping) setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deck, isFlipping]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
          <Loader2 className="animate-spin text-zinc-500" size={32} />
        </div>
      </DashboardLayout>
    );
  }

  if (!deck || deck.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center px-4">
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-8 max-w-md">
            <BookOpen size={48} className="text-zinc-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No Flashcards Available</h3>
            <p className="text-zinc-400 text-sm mb-4">Generate flashcards for this document to start studying.</p>
            <button 
              onClick={() => navigate(`/documents/${id}`)}
              className="px-6 py-2.5 bg-[#C9A44C] text-[#09090B] rounded-xl font-medium hover:bg-[#D4B45C] transition-colors"
            >
              Back to Document
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-zinc-900">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Left - Back & Title */}
              <div className="flex items-center gap-3 min-w-0">
                <button 
                  onClick={() => navigate(`/documents/${id}`)} 
                  className="p-1.5 sm:p-2 hover:bg-zinc-800 active:bg-zinc-700 rounded-lg transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft size={18} className="text-zinc-400" />
                </button>
                <div className="flex items-center gap-2 min-w-0">
                  <Sparkles size={16} className="text-[#C9A44C] flex-shrink-0" />
                  <h1 className="text-sm sm:text-base font-semibold text-white truncate">
                    {data?.title || "Flashcards"}
                  </h1>
                </div>
              </div>

              {/* Center - Progress */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span className="font-medium text-white">{current + 1}</span>
                  <span>/</span>
                  <span>{deck.length}</span>
                  <span className="text-zinc-600 ml-1">cards</span>
                </div>
              </div>

              {/* Right - Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* View Toggle */}
                <div className="hidden sm:flex bg-[#121212] border border-[#1f1f1f] rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === 'card' 
                        ? 'bg-[#C9A44C] text-[#09090B]' 
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-[#C9A44C] text-[#09090B]' 
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <List size={14} />
                  </button>
                </div>

                {/* Shuffle & Restart */}
                <button 
                  onClick={shuffleDeck} 
                  disabled={isFlipping}
                  className="p-1.5 sm:p-2 bg-[#121212] border border-[#1f1f1f] rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-50"
                  title="Shuffle cards"
                >
                  <Shuffle size={16} />
                </button>
                <button 
                  onClick={restartDeck} 
                  disabled={isFlipping}
                  className="p-1.5 sm:p-2 bg-[#121212] border border-[#1f1f1f] rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-50"
                  title="Restart deck"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Mobile Progress */}
          <div className="sm:hidden flex items-center justify-between mb-4">
            <span className="text-xs text-zinc-500">
              Card <span className="text-white font-medium">{current + 1}</span> of {deck.length}
            </span>
            <span className="text-xs text-zinc-500">
              {Math.round(((current + 1) / deck.length) * 100)}%
            </span>
          </div>

          {/* Progress Bar - Mobile */}
          <div className="sm:hidden w-full h-0.5 bg-zinc-800 rounded-full mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-[#C9A44C] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((current + 1) / deck.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Card View */}
          {viewMode === 'card' && (
            <>
              {/* Flashcard */}
              <div 
                className="relative perspective-[1200px] h-[300px] sm:h-[380px] lg:h-[420px] cursor-pointer" 
                onClick={() => {
                  if (!isFlipping) setIsFlipped(!isFlipped);
                }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative h-full w-full"
                >
                  {/* FRONT - Question */}
                  <div 
                    style={{ backfaceVisibility: "hidden" }} 
                    className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#1f1f1f] bg-gradient-to-br from-[#121212] to-[#0A0A0A] shadow-2xl"
                  >
                    <div className="flex h-full flex-col justify-between p-5 sm:p-8 lg:p-10">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-[#C9A44C]/30 bg-[#C9A44C]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#C9A44C]">
                          Question
                        </span>
                        <span className="text-[10px] text-zinc-500">Tap to Flip</span>
                      </div>
                      <div className="flex flex-1 items-center justify-center py-4">
                        <h2 className="max-w-3xl text-center text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
                          {deck[current].question}
                        </h2>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>Card {current + 1} of {deck.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK - Answer */}
                  <div 
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }} 
                    className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0A1A0A] to-[#121212] shadow-2xl"
                  >
                    <div className="flex h-full flex-col justify-between p-5 sm:p-8 lg:p-10">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                          Answer
                        </span>
                        <span className="text-[10px] text-zinc-400">Tap to Flip</span>
                      </div>
                      <div className="flex flex-1 items-center justify-center py-4">
                        <p className="max-w-3xl text-center text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-200">
                          {deck[current].answer}
                        </p>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span className="text-emerald-400/60">✓ Keep Practicing</span>
                        <span>{current + 1}/{deck.length}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-4 mt-5 sm:mt-6">
                <button 
                  onClick={() => handleNav(-1)} 
                  disabled={current === 0 || isFlipping} 
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#121212] border border-[#1f1f1f] rounded-xl text-sm text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <span className="text-xs text-zinc-500 hidden sm:block">
                  Press <kbd className="px-2 py-0.5 bg-[#121212] border border-[#1f1f1f] rounded text-[10px]">Space</kbd> to flip
                </span>

                <button 
                  onClick={() => handleNav(1)} 
                  disabled={current === deck.length - 1 || isFlipping} 
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#121212] border border-[#1f1f1f] rounded-xl text-sm text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {deck.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-[#121212] border rounded-xl p-4 sm:p-5 transition-all duration-200
                    ${index === current 
                      ? 'border-[#C9A44C] bg-[#C9A44C]/5' 
                      : 'border-[#1f1f1f] hover:border-zinc-700'
                    }`}
                  onClick={() => {
                    setCurrent(index);
                    setIsFlipped(false);
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{card.question}</p>
                      <p className="text-zinc-400 text-sm truncate">{card.answer}</p>
                    </div>
                    {index === current && (
                      <CheckCircle size={16} className="text-[#C9A44C] flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Keyboard Shortcuts */}
          <div className="mt-6 text-center text-[10px] text-zinc-600">
            <span className="px-2 py-1 bg-[#121212] border border-[#1f1f1f] rounded">←</span>
            <span className="mx-1">/</span>
            <span className="px-2 py-1 bg-[#121212] border border-[#1f1f1f] rounded">→</span>
            <span className="mx-2">or</span>
            <span className="px-2 py-1 bg-[#121212] border border-[#1f1f1f] rounded">Space</span>
            <span className="ml-2 text-zinc-500">to flip card</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}