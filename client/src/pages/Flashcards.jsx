import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  RotateCcw, Shuffle, ChevronLeft, ChevronRight, 
  ArrowLeft, Loader2, BookOpen, Sparkles
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
        if (!isFlipping) setIsFlipped(!isFlipped);
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
      {/* Fixed: Added overflow-hidden and proper rounded classes */}
      <div className="w-full min-h-screen bg-zinc-950 rounded-none md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">
              <button 
                onClick={() => navigate(`/documents/${id}`)} 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#C9A44C]" />
                <span className="text-sm font-medium text-white">Flashcards</span>
              </div>
              <span className="text-xs text-zinc-500">
                {current + 1} / {deck.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-0.5 bg-zinc-800">
          <motion.div 
            className="h-full bg-[#C9A44C]"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 1) / deck.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          
          {/* Flashcard */}
          <div 
            className="relative perspective-[1200px] h-[320px] sm:h-[400px] cursor-pointer" 
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
              {/* Front - Question */}
              <div 
                style={{ backfaceVisibility: "hidden" }} 
                className="absolute inset-0 overflow-hidden rounded-2xl border border-[#1f1f1f] bg-gradient-to-br from-[#121212] to-[#0A0A0A] shadow-2xl"
              >
                <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Question</span>
                    <span className="text-[10px] text-zinc-600">Tap to reveal</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center leading-relaxed">
                      {deck[current].question}
                    </h2>
                  </div>
                  <div className="text-xs text-zinc-500 text-center">
                    👆 Tap to see answer
                  </div>
                </div>
              </div>

              {/* Back - Answer */}
              <div 
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }} 
                className="absolute inset-0 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0A1A0A] to-[#121212] shadow-2xl"
              >
                <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400">Answer</span>
                    <span className="text-[10px] text-zinc-600">Tap to hide</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <p className="text-lg sm:text-xl lg:text-2xl text-zinc-200 text-center leading-relaxed">
                      {deck[current].answer}
                    </p>
                  </div>
                  <div className="text-xs text-emerald-400/60 text-center">
                    ✅ Got it? Tap to go back
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button 
              onClick={() => handleNav(-1)} 
              disabled={current === 0} 
              className="flex items-center gap-2 px-4 py-2.5 bg-[#121212] border border-[#1f1f1f] rounded-xl text-sm text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <kbd className="px-2 py-1 bg-[#121212] border border-[#1f1f1f] rounded text-[10px]">Space</kbd>
              <span>to flip</span>
            </div>

            <button 
              onClick={() => handleNav(1)} 
              disabled={current === deck.length - 1} 
              className="flex items-center gap-2 px-4 py-2.5 bg-[#121212] border border-[#1f1f1f] rounded-xl text-sm text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-30"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button 
              onClick={shuffleDeck} 
              disabled={isFlipping}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] border border-[#1f1f1f] rounded-lg text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-50"
            >
              <Shuffle size={14} /> Shuffle
            </button>
            <button 
              onClick={restartDeck} 
              disabled={isFlipping}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] border border-[#1f1f1f] rounded-lg text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-50"
            >
              <RotateCcw size={14} /> Restart
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}