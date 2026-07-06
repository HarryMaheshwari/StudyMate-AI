import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useFlashcards from "../hooks/useFlashcards";

export default function Flashcards() {
  const { id } = useParams();
  const { data, isLoading } = useFlashcards(id);
  
  const [deck, setDeck] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useMemo(() => {
    if (data?.cards) setDeck(data.cards);
  }, [data]);

  const handleNav = (dir) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrent((prev) => Math.max(0, Math.min(prev + dir, deck.length - 1)));
    }, 200);
  };

  const shuffleDeck = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setDeck([...deck].sort(() => Math.random() - 0.5));
      setCurrent(0);
    }, 200);
  };

  const restartDeck = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setDeck(data.cards);
      setCurrent(0);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNav(1);
      if (e.key === "ArrowLeft") handleNav(-1);
      if (e.key === " ") { e.preventDefault(); setIsFlipped((prev) => !prev); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deck]);


  if (isLoading || !deck) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">{data.title}</h1>
            <p className="mt-2 text-zinc-400">Click the card or press Space to flip it.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Progress</p>
            <h2 className="mt-1 text-3xl font-bold">{current + 1}/{deck.length}</h2>
          </div>
        </div>

        {/* Card Interaction Stage */}
        <div className="perspective-[1200px] h-[420px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-full w-full"
          >
            {/* FRONT */}
            <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 overflow-hidden rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black shadow-2xl">
              <div className="flex h-full flex-col justify-between p-10">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">Question</span>
                  <span className="text-sm text-zinc-500">Tap to Flip</span>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <h2 className="max-w-3xl text-center text-4xl font-bold leading-relaxed">{deck[current].question}</h2>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>StudyMate AI</span>
                  <span>Card {current + 1}</span>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }} className="absolute inset-0 overflow-hidden rounded-[32px] border border-emerald-500/40 bg-gradient-to-br from-emerald-950 to-zinc-900 shadow-2xl">
              <div className="flex h-full flex-col justify-between p-10">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">Answer</span>
                  <span className="text-sm text-zinc-400">Tap to Flip</span>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <p className="max-w-3xl text-center text-2xl leading-10 text-zinc-200">{deck[current].answer}</p>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Keep Practicing 🚀</span>
                  <span>{current + 1}/{deck.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation & Utilities */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2">
            <button onClick={shuffleDeck} className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 hover:bg-zinc-800"><Shuffle size={16} /> Shuffle</button>
            <button onClick={restartDeck} className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 hover:bg-zinc-800"><RotateCcw size={16} /> Restart</button>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleNav(-1)} disabled={current === 0} className="rounded-xl border border-zinc-800 p-3 hover:bg-zinc-800 disabled:opacity-30"><ChevronLeft /></button>
            <button onClick={() => handleNav(1)} disabled={current === deck.length - 1} className="rounded-xl border border-zinc-800 p-3 hover:bg-zinc-800 disabled:opacity-30"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}